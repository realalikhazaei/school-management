import userSchema from './userSchema.js';

const typeDefs = `#graphql
  ${userSchema}

  type Query {
    getAllUsers: [User]
    error: User
  }
`;

export default typeDefs;
