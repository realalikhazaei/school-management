const activitySchema = `#graphql
  type Activity {
    _id: ID!
    absences: [ChildActivity]
    points: [ChildActivity]
    penalties: [ChildActivity]
    lessonId: ID!
    lessonTitle: String
    lessonWeeklyTime: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type ChildActivity {
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
  }
`;

export default activitySchema;
