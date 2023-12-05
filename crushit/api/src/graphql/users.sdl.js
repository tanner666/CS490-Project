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
    darkMode: Boolean!
    pomodoros: [PomodoroTimer]!
    refreshToken: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(firebaseUid: String!): User @requireAuth
    userTheme(firebaseUid: String!): Boolean @requireAuth
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
    darkMode: Boolean
    firebaseUid: String
    refreshToken: String
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Mutation {
    updateTheme(firebaseUid: String!, darkMode: Boolean!) : User! @requireAuth
    updateUser(firebaseUid: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth

    createUser(input: CreateUserInput!): User @skipAuth
    loginUser(input: LoginUserInput): User! @skipAuth
    logoutUser: Boolean @requireAuth
  }
`
