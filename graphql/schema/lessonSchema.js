const lessonSchema = `#graphql
  type Lesson {
    _id: ID!
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
