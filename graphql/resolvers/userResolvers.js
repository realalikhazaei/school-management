import User from '../../http/models/userModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';
import { GraphQLError } from 'graphql';

const getAllUsers = async (_, args, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const users = await User.find(args);
  if (!users.length) throw new GraphQLError('No users found with the specifications.', { extensions: { code: 404 } });

  return users;
};

const getUser = async (_, { _id }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const user = await User.findById(_id);
  if (!user) throw new GraphQLError('No user found with this ID.', { extensions: { code: 404 } });

  return user._doc;
};

const getMe = async (_, __, { accessToken }) => verifyToken(accessToken);

const updateUser = async (_, { input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');
  const { _id } = input;
  delete input._id;

  const user = await User.findByIdAndUpdate(_id, input, { new: true, runValidators: true });
  if (!user) throw new GraphQLError('There is no user with this ID.', { extensions: { code: 404 } });

  return user._doc;
};

const updateMe = async (_, { input }, { accessToken }) => {
  const { _id } = await verifyToken(accessToken);

  const user = await User.findByIdAndUpdate(_id, input, { new: true, runValidators: true });

  return user._doc;
};

const deleteUsers = async (_, { _ids }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const res = await User.deleteMany({ _id: { $in: _ids } });
  if (!res.deletedCount)
    throw new GraphQLError('No documents found with the specified IDs.', { extensions: { code: 404 } });

  return `${res.deletedCount} user(s) have been deleted successfully.`;
};

export const userQuery = { getAllUsers, getUser, getMe };

export const userMutation = { updateUser, updateMe, deleteUsers };
