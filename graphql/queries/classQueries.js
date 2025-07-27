const classQuery = `#graphql
  getAllClasses(field: String, grade: Int): [Class!]
  getClass(_id: ID!): Class
  getClassTimetable(_id: ID!): Class
  # getMyTimetable: Class
  # getMyClass: Class
`;

const classMutation = `#graphql
  createClass(input: CreateClassInput!): Class
  updateClass(input: UpdateClassInput!): Class
  deleteClass(_id: ID!): String
  determineClassTimetable(_id: ID!): Class
`;

const classInput = `#graphql
  input CreateClassInput {
    alias: String
    grade: Int!
    field: String
  }

  input UpdateClassInput {
    _id: ID!
    alias: String
    grade: Int
    field: String
  }
`;

export { classQuery, classMutation, classInput };
