import User from '../../http/models/userModel.js';
import { verifyToken } from '../../http/utils/accessToken.js';
import { GraphQLError } from 'graphql';

const getUsers = async (_, args, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const users = await User.find(args);
  if (!users.length) throw new GraphQLError('No users found with the specifications.', { extensions: { code: 404 } });

  return users;
};

const getMe = async (_, __, { accessToken }) => verifyToken(accessToken);

const updateUser = async (_, { _id, input }, { accessToken }) => {
  await verifyToken(accessToken, 'manager');

  const user = await User.findByIdAndUpdate(_id, input, { new: true, runValidators: true });

  return user;
};

const updateMe = async (_, { input }, { accessToken }) => {
  const { _id } = await verifyToken(accessToken);

  const user = await User.findByIdAndUpdate(_id, input, { new: true, runValidators: true });

  return user;
};

export const userQuery = { getUsers, getMe };

export const userMutation = { updateUser, updateMe };
