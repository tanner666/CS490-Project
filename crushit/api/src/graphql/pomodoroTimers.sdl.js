export const schema = gql`
  type PomodoroTimer {
    id: Int!
    pomodoro: Int!
    short: Int!
    long: Int!
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
    userId: String!
    taskId: Int!
  }

  input UpdatePomodoroTimerInput {
    pomodoro: Int
    short: Int
    long: Int
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
