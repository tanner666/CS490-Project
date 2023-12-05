export const schema = gql`
  type PomodoroTimer {
    id: Int!
    pomodoro: Int!
    short: Int!
    long: Int!
    currentPomo: Float  # New field for current pomodoro value
    currentShort: Float  # New field for current short break value
    currentLong: Float  # New field for current long break value
    userId: String!
    taskId: Int!
    user: User!
    task: Task!
  }

  type Query {
    pomodoroTimers: [PomodoroTimer!]! @requireAuth
    pomodoroTimer(id: Int!): PomodoroTimer @requireAuth
  }

  input CreatePomodoroTimerInput {
    pomodoro: Int!
    short: Int!
    long: Int!
    currentPomo: Float  # New field for current pomodoro value
    currentShort: Float  # New field for current short break value
    currentLong: Float  # New field for current long break value
    userId: String!
    taskId: Int!
  }

  input UpdatePomodoroTimerInput {
    pomodoro: Int
    short: Int
    long: Int
    currentPomo: Float  # New field for current pomodoro value
    currentShort: Float  # New field for current short break value
    currentLong: Float  # New field for current long break value
    userId: String
    taskId: Int
  }

  type Mutation {
    createPomodoroTimer(input: CreatePomodoroTimerInput!): PomodoroTimer!
      @requireAuth
    updatePomodoroTimer(
      id: Int!
      input: UpdatePomodoroTimerInput!
    ): PomodoroTimer! @requireAuth
    deletePomodoroTimer(id: Int!): PomodoroTimer! @requireAuth
  }
`
