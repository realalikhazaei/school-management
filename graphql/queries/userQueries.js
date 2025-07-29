const userQuery = `#graphql
  getAllUsers(input: GetAllUsersInput): [User!]
  getUser(_id: ID!): User
  getMe: User
`;

const userMutation = `#graphql
  updateUser(input: UpdateUserInput!): User
  deleteUsers(_ids: [ID!]!): String
  updateMe(input: UpdateMeInput!): User
  determineStudentsClass(input: StudentsClassInput!): String
`;

const userInput = `#graphql
  input GetAllUsersInput {
    _id: ID
    role: String
    classId: ID
  }

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

  input StudentsClassInput {
    classId: ID!
    classGrade: Int!
    classAlias: String!
    students: [ID!]
  }
`;

export { userQuery, userMutation, userInput };
