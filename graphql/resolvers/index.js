import { userQuery, userMutation } from './userResolver.js';

const resolvers = {
  Query: {
    ...userQuery,
  },
};

export default resolvers;
