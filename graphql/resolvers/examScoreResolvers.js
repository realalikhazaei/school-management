import { GraphQLError } from 'graphql';
import Exam from '../../http/models/examModel.js';
import ExamScore from '../../http/models/examScoreModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getExamScores = async (_, { input }, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  if (role === 'teacher') input.teacher = teacher;

  if (input.exam) {
    input._id = input.exam;
    delete input.exam;
  }

  const exams = await Exam.find(input, 'id');
  if (!exams.length) throw new GraphQLError('No exams found with the criteria.', { extensions: { code: 404 } });
  const examIDs = exams.map(el => el.id);

  const examScores = await ExamScore.find({ exam: { $in: examIDs } });
  if (!examScores.length) throw new GraphQLError('No scores found with the criteria.', { extensions: { code: 404 } });

  return examScores;
};

const submitExamScores = async (_, { input }, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');

  const { exam, scores } = input;

  if (role === 'teacher') {
    const examDoc = await Exam.findOne({ _id: exam, teacher });
    if (!examDoc) throw new GraphQLError('No exam found with this ID for you.', { extensions: { code: 404 } });
  }

  const scoresPromises = scores.map(
    async score =>
      await ExamScore.findOneAndUpdate({ studentId: score.studentId, exam }, score, {
        upsert: true,
        new: true,
        runValidators: true,
      }),
  );

  const examScores = await Promise.all(scoresPromises);

  return examScores;
};

export const examScoreQuery = { getExamScores };

export const examScoreMutation = { submitExamScores };
