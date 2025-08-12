import { GraphQLError } from 'graphql';
import Exam from '../../http/models/examModel.js';
import Lesson from '../../http/models/lessonModel.js';
import User from '../../http/models/userModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getAllExams = async (_, { input }, { accessToken }) => {
  //Verify the user, take user ID and user role
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  //Assign the inputs to a variable for better use
  const criteria = input || {};

  //Add the teacher ID to the criteria
  if (role === 'teacher') criteria.teacher = teacher;

  //Find the exams with the criteria
  const exams = await Exam.find(criteria);

  //Throws an error in case of not finding any exam
  if (!exams.length) throw new GraphQLError('No exams found with the criteria.', { extensions: { code: 404 } });

  return exams;
};

const getExam = async (_, args, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  const criteria = args;
  if (role === 'teacher') criteria.teacher = teacher;

  const exam = await Exam.findOne(criteria);
  if (!exam) throw new GraphQLError('There is no exam found with this ID for you.', { extensions: { code: 404 } });

  return exam;
};

const addUpdateExam = async (_, { input }, { accessToken }) => {
  //Verify the user, take user ID
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  //Add the teacher ID to the criteria
  if (role === 'teacher') input.teacher = teacher;

  //Find the lesson, conditionally add teacher ID
  const lesson = await Lesson.findOne({ _id: input.lessonId, ...(role === 'teacher' && { teacher }) });
  if (!lesson) throw new GraphQLError('There is no lesson found with this ID for you.', { extensions: { code: 404 } });

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

const deleteExam = async (_, args, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  if (role === 'teacher') args.teacher = teacher;

  const exam = await Exam.findOneAndDelete(args);
  if (!exam) throw new GraphQLError('No exam found with this ID for you.', { extensions: { code: 404 } });

  return `${exam.lessonTitle} exam has been deleted successfully.`;
};

const teacher = async parent => User.findById(parent.teacher);

const populateLesson = async parent => Lesson.findById(parent.lessonId);

export const examQuery = { getAllExams, getExam };

export const examMutation = { addUpdateExam, deleteExam };

export const examPopulation = { teacher, lessonId: populateLesson };
