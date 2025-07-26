const lessonListSchema = `#graphql
  type LessonList {
    _id: ID!
    title: String!
    grade: Int!
    field: String
    coefficient: Int!
  }
`;

export default lessonListSchema;
