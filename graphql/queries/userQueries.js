const userQuery = `#graphql
  getUsers(_id: ID, role: String): [User!]!
  getMe: User
`;

const userMutation = `#graphql
  updateUser(input: UpdateUserInput!): User
  deleteUsers(_ids: [ID!]!): String
  updateMe(input: UpdateMeInput!): User
`;

const userInput = `#graphql
  input UpdateUserInput {
    _id: ID!
    name: String
    father: String
    idCard: String
    birthdate: String
    role: String
    photo: String
    phone: String
  }

  input UpdateMeInput {
    birthdate: String
    photo: String
    phone: String
  }
`;

export { userQuery, userMutation, userInput };
