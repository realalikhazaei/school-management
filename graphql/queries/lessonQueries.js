const lessonQuery = `#graphql`;

const lessonMutation = `#graphql
  addLessons(input: [AddLessonsInput!]!): [Lesson!]
`;

const lessonInput = `#graphql
  input AddLessonsInput {
    class: ID!
    title: String!
    grade: Int!
    field: String
    coefficient: Int
    weeklyTimes: [String!]!
    teacher: ID!
  }
`;

export { lessonQuery, lessonMutation, lessonInput };
