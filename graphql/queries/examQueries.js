const examQuery = `#graphql
  getAllExams(input: GetAllExamsInput): [Exam!]
  getExam(_id: ID!): Exam
`;

const examMutation = `#graphql
  addUpdateExam(input: AddUpdateExamInput!): Exam
`;

const examInput = `#graphql
  input GetAllExamsInput {
    _id: ID
    semester: Int
    type: String
    lessonId: ID
  }

  input AddUpdateExamInput {
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
