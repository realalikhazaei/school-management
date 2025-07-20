import userSchema from './schema/userSchema.js';
import allQueries from './queries/allQueries.js';

const typeDefs = `#graphql
  ${userSchema}

  
  ${allQueries}
`;

export default typeDefs;
