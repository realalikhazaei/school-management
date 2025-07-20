import { userQuery } from './userQueries.js';

const queries = `#graphql
  type Query {
    ${userQuery}
  }
`;

export default queries;
