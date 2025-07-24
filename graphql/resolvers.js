import { userQuery, userMutation } from './resolvers/userResolvers.js';
import { schoolQuery } from './resolvers/schoolResolvers.js';
import { lessonListQuery, lessonListMutation } from './resolvers/lessonListResolvers.js';
import dateScalar from './scalars/dateScalar.js';

const resolvers = {
  Query: {
    ...userQuery,
    ...schoolQuery,
    ...lessonListQuery,
  },

  Mutation: {
    ...userMutation,
    ...lessonListMutation,
  },

  Date: dateScalar,
};

export default resolvers;
