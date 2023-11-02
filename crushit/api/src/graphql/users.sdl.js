export const schema = gql`
  type User {
    id: Int!
    email: String!
    firebaseUid: String!
    username: String!
    name: String!
    pomodoroLength: Int!
    pomodoroShort:  Int!
    pomodoroLong:  Int!
    pomodoros: [PomodoroTimer]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(firebaseUid: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    firebaseUid: String!
  }

  input UpdateUserInput {
    username: String!
    name: String
    email: String
    pomodoroLength: Int
    pomodoroShort:  Int
    pomodoroLong:  Int
    firebaseUid: String
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    updateUser(firebaseUid: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth

    createUser(input: CreateUserInput!): User @skipAuth
    loginUser(input: LoginUserInput): User! @skipAuth
    logoutUser: Boolean @requireAuth
  }
`
