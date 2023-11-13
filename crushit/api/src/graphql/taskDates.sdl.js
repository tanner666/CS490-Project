export const schema = gql`
  type TaskDate {
    id: Int!
    day: Int!
    month: Int!
    year: Int!
    taskId: Int!
    task: Task!
  }

  type Query {
    taskDates: [TaskDate!]! @requireAuth
    taskDate(id: Int!): TaskDate @requireAuth
  }

  input CreateTaskDateInput {
    day: Int!
    month: Int!
    year: Int!
    taskId: Int!
  }

  input UpdateTaskDateInput {
    day: Int
    month: Int
    year: Int
    taskId: Int
  }

  type Mutation {
    createTaskDate(input: CreateTaskDateInput!): TaskDate! @requireAuth
    updateTaskDate(id: Int!, input: UpdateTaskDateInput!): TaskDate!
      @requireAuth
    deleteTaskDate(id: Int!): TaskDate! @requireAuth
  }
`
