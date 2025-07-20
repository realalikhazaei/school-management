import HttpError from '../../http/utils/httpError.js';

const getAllUsers = () => [
  { name: 'Ali', age: 25 },
  { name: 'Qazal', age: 20 },
];

const error = () => {
  throw new HttpError('Test', 500);
};

export const userQuery = { getAllUsers, error };

export const userMutation = {};
