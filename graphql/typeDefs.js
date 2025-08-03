import userSchema from './schema/userSchema.js';
import schoolSchema from './schema/schoolSchema.js';
import classSchema from './schema/classSchema.js';
import lessonSchema from './schema/lessonSchema.js';
import lessonListSchema from './schema/lessonListSchema.js';
import activitySchema from './schema/activitySchema.js';
import examSchema from './schema/examSchema.js';
import { userQuery, userMutation, userInput } from './queries/userQueries.js';
import { schoolQuery } from './queries/schoolQueries.js';
import { classQuery, classMutation, classInput } from './queries/classQueries.js';
import { lessonQuery, lessonMutation, lessonInput } from './queries/lessonQueries.js';
import { lessonListQuery, lessonListMutation, lessonListInput } from './queries/lessonListQueries.js';
import { examQuery, examMutation, examInput } from './queries/examQueries.js';
import { activityQuery, activityMutation, activityInput } from './queries/activityQueries.js';

const typeDefs = `#graphql
  #Custom types
  scalar Date

  #Schema definition
  ${userSchema}
  ${schoolSchema}
  ${classSchema}
  ${lessonSchema}
  ${lessonListSchema}
  ${activitySchema}
  ${examSchema}
  
  #Query definition
  type Query {
    ${userQuery}
    ${schoolQuery}
    ${classQuery}
    ${lessonQuery}
    ${lessonListQuery}
    ${examQuery}
    ${activityQuery}
  }

  #Mutation definition
  type Mutation {
    ${userMutation}
    ${classMutation}
    ${lessonMutation}
    ${lessonListMutation}
    ${examMutation}
    ${activityMutation}
  }

  #Custom inputs
  ${userInput}
  ${classInput}
  ${lessonInput}
  ${lessonListInput}
  ${examInput}
  ${activityInput}
`;

export default typeDefs;
