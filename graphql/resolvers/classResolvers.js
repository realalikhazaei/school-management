import { GraphQLError } from 'graphql';
import Class from '../../http/models/classModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';

const getAllClasses = async (_, args, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classes = await Class.find(args);
  if (!classes.length) throw new GraphQLError('No classes found.', { extensions: { code: 404 } });

  return classes;
};

const getClass = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const classDoc = await Class.findById(_id);
  if (!classDoc) throw new GraphQLError('There is no document found with this ID.', { extensions: { code: 404 } });

  return classDoc._doc;
};

/* const getMyClass = async (_, __, {accessToken}) => {
  const 
} */

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

export const classQuery = { getAllClasses, getClass };

export const classMutation = { createClass, updateClass };
