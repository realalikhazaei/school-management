import { userQuery, userMutation } from './resolvers/userResolvers.js';
import { schoolQuery } from './resolvers/schoolResolvers.js';
import { classQuery, classMutation } from './resolvers/classResolvers.js';
import { lessonQuery, lessonMutation } from './resolvers/lessonResolvers.js';
import { lessonListQuery, lessonListMutation } from './resolvers/lessonListResolvers.js';
import { examQuery, examMutation } from './resolvers/examResolvers.js';
import { examScoreQuery, examScoreMutation } from './resolvers/examScoreResolvers.js';
import { activityQuery, activityMutation } from './resolvers/activityResolvers.js';
import dateScalar from './scalars/dateScalar.js';

const resolvers = {
  Query: {
    ...userQuery,
    ...schoolQuery,
    ...classQuery,
    ...lessonQuery,
    ...lessonListQuery,
    ...examQuery,
    ...examScoreQuery,
    ...activityQuery,
  },

  Mutation: {
    ...userMutation,
    ...classMutation,
    ...lessonMutation,
    ...lessonListMutation,
    ...examMutation,
    ...examScoreMutation,
    ...activityMutation,
  },

  Date: dateScalar,
};

export default resolvers;
