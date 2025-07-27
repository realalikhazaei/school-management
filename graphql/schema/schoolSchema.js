const schoolSchema = `#graphql
  type School {
    _id: ID!
    name: String!
    code: Int!
    manager: Manager
  }

  type Manager {
    name: String!
    photo: String!
  }
`;

export default schoolSchema;
