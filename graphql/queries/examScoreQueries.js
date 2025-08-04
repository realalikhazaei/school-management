const examScoreQuery = `#graphql
  getExamScores(input: GetExamScoresInput!): [ExamScore!]
`;

const examScoreMutation = `#graphql
  submitExamScores(input: SubmitExamScoreInput!): [ExamScore!]
`;

const examScoreInput = `#graphql
  input GetExamScoresInput {
    exam: ID
    lessonId: ID
    semester: Int
    type: String
  }

  input SubmitExamScoreInput {
    exam: ID!
    scores: [ScoreInput!]
  }

  input ScoreInput {
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
    score: Int
  }
`;

export { examScoreQuery, examScoreMutation, examScoreInput };
