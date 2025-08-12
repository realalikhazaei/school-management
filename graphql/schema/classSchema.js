const classSchema = `#graphql
  type Class {
    _id: ID!
    alias: String!
    grade: Int!
    school: School!
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
