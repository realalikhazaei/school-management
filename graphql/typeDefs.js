import userSchema from './schema/userSchema.js';
import schoolSchema from './schema/schoolSchema.js';
import { userQuery, userMutation, userInputs } from './queries/userQueries.js';
import { schoolQuery } from './queries/schoolQueries.js';

const typeDefs = `#graphql
  scalar Date

  ${userSchema}
  ${schoolSchema}
  
  type Query {
    ${userQuery}
    ${schoolQuery}
  }

  type Mutation {
    ${userMutation}
  }

  ${userInputs}
`;

export default typeDefs;
