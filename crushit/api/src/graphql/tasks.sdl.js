export const schema = gql`
  type Task {
    id: Int!
    taskName: String!
    ImportanceGroup: ImportanceGroupEnum
    completionStatus: Boolean!
    description: String
    pomodoroTimers: Int!
    pomodoroTimerType: String
    taskOrder: Int!
    createdBy: String!
    created_by: User!
    taskDates: [TaskDate]!
    pomodoro: [PomodoroTimer]
  }

  enum ImportanceGroupEnum {
    TopPriority
    Important
    Other
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
    userTasksOnDate(userId: String!, day: Int!, month: Int!, year: Int!): [Task!]! @requireAuth
  }

  input CreateTaskInput {
    taskName: String!
    ImportanceGroup: ImportanceGroupEnum
    completionStatus: Boolean!
    description: String
    pomodoroTimers: Int!
    pomodoroTimerType: String
    taskOrder: Int!
    createdBy: String!
    taskDates: [TaskDateInput!]
    pomodoro: [PomodoroTimerInput]
  }

  input UpdateTaskInput {
    taskName: String
    ImportanceGroup: ImportanceGroupEnum
    completionStatus: Boolean
    description: String
    pomodoroTimers: Int
    pomodoroTimerType: String
    taskOrder: Int
    createdBy: String
    pomodoro: [PomodoroTimerInput]
  }

  input TaskDateInput {
    day: Int!
    month: Int!
    year: Int!
  }

  input PomodoroTimerInput {
    pomodoro: Int!
    short: Int!
    long: Int!
    userId: Int!
    taskId: Int!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
