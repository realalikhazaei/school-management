const userQuery = `#graphql
  getUsers(_id: ID, role: String): [User!]!
  getMe: User
`;

const userMutation = `#graphql
  updateUser(_id: ID!, input: InputUpdateUser!): User
  updateMe(input: InputUpdateMe!): User
`;

const userInputs = `#graphql
  input InputUpdateUser {
    name: String
    father: String
    idCard: String
    birthdate: String
    role: String
    photo: String
    phone: String
  }

  input InputUpdateMe {
    birthdate: String
    photo: String
    phone: String
  }
`;

export { userQuery, userMutation, userInputs };
