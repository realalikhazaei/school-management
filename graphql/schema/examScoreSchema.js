const examScoreSchema = `#graphql
  type ExamScore {
    _id: ID!
    exam: ID!
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
    score: Int
  }
`;

export default examScoreSchema;
