const userQuery = `#graphql
  getUsers(_id: ID, role: String): [User!]!
  getMe: User
`;

const userMutation = `#graphql
  updateUser(_id: ID!, input: UpdateUserInput!): User
  updateMe(input: UpdateMeInput!): User
`;

const userInputs = `#graphql
  input UpdateUserInput {
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

export { userQuery, userMutation, userInputs };
