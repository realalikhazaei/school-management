const userSchema = `#graphql
  type User {
    _id: ID!
    name: String!
    father: String!
    idCard: String!
    birthdate: String
    role: String
    photo: String
    phone: String!
    school: ID!
    studentClass: studentClass
    studentReport: [studentReport!]
  }

  type studentClass {
    classId: ID!
    classGrade: Int!
    classTitle: String!
  }

  type studentReport {
    semester: Int!
    type: String!
    lessonId: ID!
    score: Float!
  }
`;

export default userSchema;
