import { GraphQLError } from 'graphql';
import Exam from '../../http/models/examModel.js';
import Lesson from '../../http/models/lessonModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getAllExams = async (_, { input }, { accessToken }) => {
  //Verify the user, take user ID and user role
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  //Assign the inputs to a variable for better use
  const criteria = input || {};

  if (role === 'teacher') {
    //Find the lessons belong to the teacher with user ID
    const lessons = await Lesson.find({ teacher }, 'id');
    const lessonIds = lessons.map(el => el.id);

    //Throw an error if the teacher lesson IDs do not match the queried lesson ID
    if (criteria?.lessonId && !lessonIds?.includes(criteria?.lessonId))
      throw new GraphQLError('This lesson exam does not belong to you.', { extensions: { code: 403 } });

    //Assign the teacher lesson IDs to the queries lesson ID in case of not existing
    if (!criteria?.lessonId) criteria.lessonId = { $in: lessonIds };
  }

  //Find the exams with the criteria
  const exams = await Exam.find(criteria);

  //Throws an error in case of not finding any exam
  if (!exams.length) throw new GraphQLError('No exams found with the criteria.', { extensions: { code: 404 } });

  return exams;
};

const addUpdateExam = async (_, { input }, { accessToken }) => {
  //Verify the user, take user ID
  const { _id: teacher } = await verifyToken(accessToken, 'teacher');

  //Find out if the lesson belongs to the teacher
  const lesson = await Lesson.findOne({ _id: input.lessonId, teacher });
  if (!lesson) throw new GraphQLError('There is no lesson with this ID for you.', { extensions: { code: 404 } });

  let exam;
  try {
    //Add / Update the exam document
    input.lessonTitle = lesson.title;
    exam = await Exam.findOneAndUpdate(
      { semester: input.semester, type: input.type, lessonId: input.lessonId },
      input,
      { upsert: true, new: true, runValidators: true },
    );
  } catch ({ code, keyValue: { semester, type } }) {
    //Catch the compound unique index error
    if (code === 11000)
      throw new GraphQLError(`There is already a ${type} exam defined for semester ${semester}.`, {
        extensions: { code: 400 },
      });
  }

  return exam._doc;
};

export const examQuery = { getAllExams };

export const examMutation = { addUpdateExam };
