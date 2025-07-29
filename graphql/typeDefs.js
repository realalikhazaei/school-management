import userSchema from './schema/userSchema.js';
import schoolSchema from './schema/schoolSchema.js';
import classSchema from './schema/classSchema.js';
import lessonSchema from './schema/lessonSchema.js';
import lessonListSchema from './schema/lessonListSchema.js';
import activitySchema from './schema/activitySchema.js';
import examSchema from './schema/examSchema.js';
import homeworkSchema from './schema/homeworkSchema.js';
import { userQuery, userMutation, userInput } from './queries/userQueries.js';
import { schoolQuery } from './queries/schoolQueries.js';
import { classQuery, classMutation, classInput } from './queries/classQueries.js';
import { lessonQuery, lessonMutation, lessonInput } from './queries/lessonQueries.js';
import { lessonListQuery, lessonListMutation, lessonListInput } from './queries/lessonListQueries.js';
import { examQuery, examMutation, examInput } from './queries/examQueries.js';

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
  ${homeworkSchema}
  
  #Query definition
  type Query {
    ${userQuery}
    ${schoolQuery}
    ${classQuery}
    ${lessonQuery}
    ${lessonListQuery}
    ${examQuery}
  }

  #Mutation definition
  type Mutation {
    ${userMutation}
    ${classMutation}
    ${lessonMutation}
    ${lessonListMutation}
    ${examMutation}
  }

  #Custom inputs
  ${userInput}
  ${classInput}
  ${lessonInput}
  ${lessonListInput}
  ${examInput}
`;

export default typeDefs;
