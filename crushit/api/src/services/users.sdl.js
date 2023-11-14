export const schema = gql`
  type User {
    id: Int!
    email: String!
    firebaseUid: String!
    username: String
    firstName: String
    lastName: String
    pomodoros: [PomodoroTimer]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    firebaseUid: String!
  }

  input UpdateUserInput {
    username: String
    firstName: String
    lastName: String
    email: String
    firebaseUid: String
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth

    createUser(input: CreateUserInput!): User @skipAuth
    loginUser(input: LoginUserInput): User! @skipAuth
    logoutUser: Boolean @requireAuth
  }
`
