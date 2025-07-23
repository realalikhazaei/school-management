import { userQuery, userMutation } from './resolvers/userResolvers.js';
import { schoolQuery } from './resolvers/schoolResolvers.js';
import dateScalar from './scalars/dateScalar.js';

const resolvers = {
  Query: {
    ...userQuery,
    ...schoolQuery,
  },

  Mutation: {
    ...userMutation,
  },

  Date: dateScalar,
};

export default resolvers;
