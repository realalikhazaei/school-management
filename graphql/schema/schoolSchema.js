const schoolSchema = `#graphql
  type School {
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
