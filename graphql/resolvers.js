import { userQuery, userMutation, userPopulation } from './resolvers/userResolvers.js';
import { schoolQuery } from './resolvers/schoolResolvers.js';
import { classQuery, classMutation, classPopulation } from './resolvers/classResolvers.js';
import { lessonQuery, lessonMutation, lessonPopulation } from './resolvers/lessonResolvers.js';
import { lessonListQuery, lessonListMutation } from './resolvers/lessonListResolvers.js';
import { examQuery, examMutation, examPopulation } from './resolvers/examResolvers.js';
import { examScoreQuery, examScoreMutation } from './resolvers/examScoreResolvers.js';
import { activityQuery, activityMutation, activityPopulation } from './resolvers/activityResolvers.js';
import dateScalar from './scalars/dateScalar.js';

const resolvers = {
  //Query resolvers
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

  //Mutation resolvers
  Mutation: {
    ...userMutation,
    ...classMutation,
    ...lessonMutation,
    ...lessonListMutation,
    ...examMutation,
    ...examScoreMutation,
    ...activityMutation,
  },

  //Population resolvers
  ...{
    User: userPopulation,
    Class: classPopulation,
    Lesson: lessonPopulation,
    Activity: activityPopulation,
    Exam: examPopulation,
  },

  //Date type
  Date: dateScalar,
};

export default resolvers;
