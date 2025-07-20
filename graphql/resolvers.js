import { userQuery, userMutation } from './resolvers/userResolvers.js';

const resolvers = {
  Query: {
    ...userQuery,
  },
};

export default resolvers;
