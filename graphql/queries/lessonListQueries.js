const lessonListQuery = `#graphql
  getLessonList(grade: Int): [LessonList]
`;

const lessonListMutation = `#graphql
  addLessonList(input: [LessonListInput!]!): [LessonList!]
  updateLessonList(input: [LessonListInput!]!): [LessonList!]
`;

const lessonListInput = `#graphql
  input LessonListInput {
    _id: ID
    title: String!
    grade: Int!
  }
`;

export { lessonListQuery, lessonListMutation, lessonListInput };
