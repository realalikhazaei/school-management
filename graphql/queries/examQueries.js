const examQuery = `#graphql
  getAllExams(input: GetAllExamsInput): [Exam!]
  getExam(_id: ID!): Exam
`;

const examMutation = `#graphql
  addUpdateExam(input: AddUpdateExamInput!): Exam
  deleteExam(_id: ID!): String
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
  }
`;

export { examQuery, examMutation, examInput };
