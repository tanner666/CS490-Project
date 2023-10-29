export const schema = gql`
  type PomodoroTimer {
    id: Int!
    pomodoro: Int!
    short: Int!
    long: Int!
    userId: Int!
    user: User!
  }

  type Query {
    pomodoroTimers: [PomodoroTimer!]! @requireAuth
    pomodoroTimer(id: Int!): PomodoroTimer @requireAuth
  }

  input CreatePomodoroTimerInput {
    pomodoro: Int!
    short: Int!
    long: Int!
    userId: Int!
  }

  input UpdatePomodoroTimerInput {
    pomodoro: Int
    short: Int
    long: Int
    userId: Int
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
