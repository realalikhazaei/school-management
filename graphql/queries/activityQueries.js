const activityQuery = `#graphql
  getAllActivities(input: GetAllActivitiesInput): [Activity!]
  getActivity(_id: ID!): Activity
`;

const activityMutation = `#graphql
  addUpdateActivity(input: AddUpdateActivityInput!): Activity
  deleteActivity(_id: ID!): String
`;

const activityInput = `#graphql
  input GetAllActivitiesInput {
    _id: ID
    lessonId: ID
    lessonWeeklyTime: String
    teacher: ID
    dateRange: [String]
  }

  input AddUpdateActivityInput {
    _id: ID
    lessonId: ID!
    lessonWeeklyTime: String!
    absences: [ChildActivityInput]
    points: [ChildActivityInput]
    penalties: [ChildActivityInput]
  }

  input ChildActivityInput {
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
  }
`;

export { activityQuery, activityMutation, activityInput };
