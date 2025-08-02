const examSchema = `#graphql
  type Exam {
    _id: ID!
    semester: Int!
    type: String!
    lessonId: ID!
    lessonTitle: String!
    teacher: ID!
    scores: [Score]
    createdAt: Date!
    updatedAt: Date!
  }

  type Score {
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
    score: Int
  }
`;

export default examSchema;
