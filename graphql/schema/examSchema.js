const examSchema = `#graphql
  type Exam {
    _id: ID!
    semester: Int!
    type: String!
    lessonId: ID!
    lessonTitle: String!
    teacher: ID!
    createdAt: Date!
    updatedAt: Date!
  }
`;

export default examSchema;
