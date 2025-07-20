const userQuery = `#graphql
  getAllUsers(role: String): [User!]!
  getUser(id: ID!, role: String): User!
`;

const userMutation = `#graphql

`;

export { userQuery, userMutation };
