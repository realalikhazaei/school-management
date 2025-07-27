import { GraphQLError } from 'graphql';
import Lesson from '../../http/models/lessonModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getAllLessons = async (_, args, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');
  let criteria = args;
  if (role === 'teacher') criteria.teacher = teacher;

  const lessons = await Lesson.find(criteria);
  if (!lessons.length) throw new GraphQLError('No lesson found with the criteria.', { extensions: { code: 404 } });

  return lessons;
};

const getLesson = async (_, args, { accessToken }) => {
  const { _id: teacher, role } = await verifyToken(accessToken, 'manager', 'teacher');
  let criteria = args;
  if (role === 'teacher') criteria.teacher = teacher;

  const lesson = await Lesson.findOne(criteria);
  if (!lesson) throw new GraphQLError('No lesson found with this ID.', { extensions: { code: 404 } });

  return lesson._doc;
};

const addLessons = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const lessons = await Lesson.create(input);

  return lessons;
};

const updateLessons = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const query = input.map(async input => {
    const { _id } = input;
    delete input._id;
    return await Lesson.findByIdAndUpdate(_id, input, { new: true, runValidators: true });
  });

  const lessons = await Promise.all(query);
  if (!lessons.length) throw new GraphQLError('No lesson found with the specified IDs.', { extensions: { code: 404 } });

  return lessons;
};

const deleteLessons = async (_, { _ids }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const { deletedCount } = await Lesson.deleteMany({ _id: { $in: _ids } });
  if (!deletedCount) throw new GraphQLError('No lessons found with the specified IDs.', { extensions: { code: 404 } });

  return `${deletedCount} lesson(s) have been deleted successfully.`;
};

export const lessonQuery = { getAllLessons, getLesson };

export const lessonMutation = { addLessons, updateLessons, deleteLessons };
