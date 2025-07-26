import userSchema from './schema/userSchema.js';
import schoolSchema from './schema/schoolSchema.js';
import classSchema from './schema/classSchema.js';
import lessonSchema from './schema/lessonSchema.js';
import lessonListSchema from './schema/lessonListSchema.js';
import { userQuery, userMutation, userInput } from './queries/userQueries.js';
import { schoolQuery } from './queries/schoolQueries.js';
import { classQuery, classMutation, classInput } from './queries/classQueries.js';
import { lessonQuery, lessonMutation, lessonInput } from './queries/lessonQueries.js';
import { lessonListQuery, lessonListMutation, lessonListInput } from './queries/lessonListQueries.js';

const typeDefs = `#graphql
  #Custom types
  scalar Date

  #Schema definition
  ${userSchema}
  ${schoolSchema}
  ${classSchema}
  ${lessonSchema}
  ${lessonListSchema}
  
  #Query definition
  type Query {
    ${userQuery}
    ${schoolQuery}
    ${classQuery}
    ${lessonListQuery}
  }

  #Mutation definition
  type Mutation {
    ${userMutation}
    ${classMutation}
    ${lessonMutation}
    ${lessonListMutation}
  }

  #Custom inputs
  ${userInput}
  ${classInput}
  ${lessonInput}
  ${lessonListInput}
`;

export default typeDefs;
