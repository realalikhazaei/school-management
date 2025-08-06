const lessonListQuery = `#graphql
  getLessonList(input: GetLessonListInput): [LessonList]
`;

const lessonListMutation = `#graphql
  addLessonList(input: [AddLessonListInput!]!): [LessonList!]
  updateLessonList(input: [UpdateLessonListInput!]!): [LessonList!]
  deleteLessonList(_ids: [ID!]!): String
`;

const lessonListInput = `#graphql
  input GetLessonListInput {
    field: String
    grade: Int
  }

  input AddLessonListInput {
    _id: ID
    title: String
    grade: Int
    field: String
    coefficient: Int
  }

  input UpdateLessonListInput {
    _id: ID
    title: String
    grade: Int
    field: String
    coefficient: Int
  }
`;

export { lessonListQuery, lessonListMutation, lessonListInput };
