const lessonQuery = `#graphql
  getAllLessons(field: String, grade: Int, teacher: ID): [Lesson!]
  getLesson(_id: ID!): Lesson
`;

const lessonMutation = `#graphql
  addLessons(input: [AddLessonsInput!]!): [Lesson!]
  updateLessons(input: [UpdateLessonsInput!]!): [Lesson!]
  deleteLessons(_ids: [ID!]!): String
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
  
  input UpdateLessonsInput {
    _id: ID!
    class: ID
    title: String
    grade: Int
    field: String
    coefficient: Int
    weeklyTimes: [String!]
    teacher: ID
  }
`;

export { lessonQuery, lessonMutation, lessonInput };
