import { GraphQLError } from 'graphql';
import Class from '../../http/models/classModel.js';
import School from '../../http/models/schoolModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getAllClasses = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classes = await Class.find(input);
  if (!classes.length) throw new GraphQLError('No classes found with the criteria.', { extensions: { code: 404 } });

  return classes;
};

const getClass = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classDoc = await Class.findById(_id);
  if (!classDoc) throw new GraphQLError('There is no document found with this ID.', { extensions: { code: 404 } });

  return classDoc._doc;
};

const getMyClass = async (_, __, { accessToken }) => {
  const {
    studentClass: { classId: _id },
  } = await verifyToken(accessToken, 'student');
  if (!_id) throw new GraphQLError('No class is determined for you yet.', { extensions: { code: 404 } });

  const classDoc = await Class.findById(_id);
  if (!classDoc) throw new GraphQLError('Your class does not exist.', { extensions: { code: 404 } });

  return classDoc._doc;
};

const getClassTimetable = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classDoc = await Class.findById(_id);
  if (!classDoc.timetable.length)
    throw new GraphQLError('Class timetable is not determined yet.', { extensions: { code: 404 } });

  return classDoc._doc;
};

const getMyTimetable = async (_, __, { accessToken }) => {
  const {
    studentClass: { classId: _id },
  } = await verifyToken(accessToken, 'student');

  const classDoc = await Class.findById(_id);
  if (!classDoc.timetable.length)
    throw new GraphQLError('Class timetable is not determined yet.', { extensions: { code: 404 } });

  return classDoc._doc;
};

const createClass = async (_, { input }, { accessToken }) => {
  const { school } = await verifyToken(accessToken, 'manager');

  const classDoc = await Class.create({ ...input, school });

  return classDoc._doc;
};

const updateClass = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');
  const { _id } = input;
  delete input._id;

  const classDoc = await Class.findByIdAndUpdate(_id, input, { new: true, runValidators: true });
  if (!classDoc) throw new GraphQLError('There is no class with this ID.', { extensions: { code: 404 } });

  return classDoc._doc;
};

const deleteClass = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classDoc = await Class.findByIdAndDelete(_id);
  if (!classDoc) throw new GraphQLError('No class document found with this ID.', { extensions: { code: 404 } });

  return `Class ${classDoc.alias} has been deleted successfully.`;
};

const determineClassTimetable = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classDoc = await Class.findById(_id).populate({ path: 'lessons', select: 'title weeklyTimes' });
  if (!classDoc) throw new GraphQLError('There is no class with this ID.', { extensions: { code: 404 } });

  const timetable = classDoc.lessons.reduce((acc, { _id: lessonId, title: lessonTitle, weeklyTimes }) => {
    acc.push({ lessonId, lessonTitle, weeklyTimes });
    return acc;
  }, []);

  classDoc.timetable = timetable;
  await classDoc.save({ validateModifiedOnly: true });

  return classDoc._doc;
};

const school = async parent => School.findById(parent.school);

export const classQuery = { getAllClasses, getClass, getMyClass, getMyTimetable, getClassTimetable };

export const classMutation = { createClass, updateClass, deleteClass, determineClassTimetable };

export const classPopulation = { school };
