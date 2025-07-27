const homeworkSchema = `#graphql
  type Homework {
    _id: ID!
    lessonId: ID!
    lessonTitle: String
    homeworks: [ChildHomework]
    instruction: String
    images: [String]
    deadline: Date!
    createdAt: Date!
    updatedAt: Date!
  }

  type ChildHomework {
    studentId: ID!
    studentFirstname: String!
    studentLastname: String!
    images: [String]
    score: Int
  }
`;
