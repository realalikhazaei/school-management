import User from '../../http/models/userModel.js';

const getAllUsers = async (_, args, context) => {
  const users = await User.find(args);
  return users;
};

const getUser = (_, args, context) => User.findOne({ _id: args.id });

export const userQuery = { getAllUsers, getUser };

export const userMutation = {};
