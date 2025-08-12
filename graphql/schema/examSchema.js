const examSchema = `#graphql
  type Exam {
    _id: ID!
    semester: Int!
    type: String!
    lessonId: Lesson!
    lessonTitle: String!
    teacher: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;

export default examSchema;
