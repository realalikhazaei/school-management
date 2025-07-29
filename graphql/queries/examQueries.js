const examQuery = `#graphql
  getAllExams(input: GetAllExamsInput): [Exam!]
  getExam(_id: ID!): Exam
`;

const examMutation = `#graphql
  addExam(input: AddExamInput!): Exam
  updateExam: Exam
`;

const examInput = `#graphql
  input GetAllExamsInput {
    _id: ID
    semester: Int
    type: String
    lessonId: ID
  }

  input AddExamInput {
    semester: Int!
    type: String!
    lessonId: ID!
    scores: [ScoreInput!]
  }

  input ScoreInput {
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
    score: Int
  }
`;

export { examQuery, examMutation, examInput };
