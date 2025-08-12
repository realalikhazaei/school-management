const lessonSchema = `#graphql
  type Lesson {
    _id: ID!
    class: Class!
    title: String!
    grade: Int!
    field: String
    coefficient: Int!
    weeklyTimes: [String!]!
    teacher: User!
  }
`;

export default lessonSchema;
