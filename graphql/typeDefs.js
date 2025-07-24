import userSchema from './schema/userSchema.js';
import schoolSchema from './schema/schoolSchema.js';
import lessonListSchema from './schema/lessonListSchema.js';
import { userQuery, userMutation, userInputs } from './queries/userQueries.js';
import { schoolQuery } from './queries/schoolQueries.js';
import { lessonListQuery, lessonListMutation, lessonListInput } from './queries/lessonListQueries.js';

const typeDefs = `#graphql
  #Custom types
  scalar Date

  #Schema definition
  ${userSchema}
  ${schoolSchema}
  ${lessonListSchema}
  
  #Query definition
  type Query {
    ${userQuery}
    ${schoolQuery}
    ${lessonListQuery}
  }

  #Mutation definition
  type Mutation {
    ${userMutation}
    ${lessonListMutation}
  }

  #Custom inputs
  ${userInputs}
  ${lessonListInput}
`;

export default typeDefs;
