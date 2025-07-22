import { userQuery, userMutation } from './resolvers/userResolvers.js';
import { schoolQuery } from './resolvers/schoolResolvers.js';

const resolvers = {
  Query: {
    ...userQuery,
    ...schoolQuery,
  },

  Mutation: {
    ...userMutation,
  },
};

export default resolvers;
