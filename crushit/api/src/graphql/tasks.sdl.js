export const schema = gql`
  type Task {
    id: Int!
    taskName: String!
    ImportanceGroup: ImportanceGroup
    completionStatus: Boolean!
    description: String
    pomodoroTimers: Int!
    pomodoroTimerType: String
    taskOrder: Int!
    createdBy: String!
    created_by: User!
    taskDates: [TaskDate]!
  }

  enum ImportanceGroup {
    TopPriority
    Important
    Other
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
    userTasksOnDate(userId: Int!, day: Int!, month: Int!, year: Int!): [Task!]! @requireAuth
  }

  input CreateTaskInput {
    taskName: String!
    ImportanceGroup: ImportanceGroup
    completionStatus: Boolean!
    description: String
    pomodoroTimers: Int!
    pomodoroTimerType: String
    taskOrder: Int!
    createdBy: String!
  }

  input UpdateTaskInput {
    taskName: String
    ImportanceGroup: ImportanceGroup
    completionStatus: Boolean
    description: String
    pomodoroTimers: Int
    pomodoroTimerType: String
    taskOrder: Int
    createdBy: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
