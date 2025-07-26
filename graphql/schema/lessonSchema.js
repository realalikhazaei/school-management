const lessonSchema = `#graphql
  type Lesson {
    class: ID!
    title: String!
    grade: Int!
    field: String
    coefficient: Int!
    weeklyTimes: [String!]!
    teacher: ID!
  }
`;

export default lessonSchema;
