const classSchema = `#graphql
  type Class {
    _id: ID!
    alias: String
    grade: Int!
    school: ID!
    field: String
    timetable: [Timetable]
  }

  type Timetable {
    lessonId: ID!
    lessonTitle: String!
    weeklyTimes: [String!]!
  }
`;

export default classSchema;
