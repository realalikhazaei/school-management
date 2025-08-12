const userSchema = `#graphql
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    father: String!
    idCard: String!
    birthdate: Date
    role: String
    photo: String
    phone: String!
    school: School!
    studentClass: studentClass
    studentReport: [studentReport!]
  }

  type studentClass {
    classId: ID!
    classGrade: Int!
    classAlias: String!
  }

  type studentReport {
    semester: Int!
    type: String!
    lessonId: ID!
    score: Float!
  }
`;

export default userSchema;
