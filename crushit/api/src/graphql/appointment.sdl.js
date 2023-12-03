export const schema = gql`
  type Appointment {
    id: Int!
    name: String
    startTime: DateTime!
    endTime: DateTime!
    category: String!
    user: User!
    task: Task!
  }

  input CreateAppointment {
    name: String
    startTime: DateTime!
    endTime: DateTime!
    category: String!
    userId: String!
    taskID: Int!
  }

  input UpdateAppointment {
    name: String
    startTime: DateTime
    endTime: DateTime
    category: String
  }

  extend type Query {
    getAppointments: [Appointment!]!
    getAppointment(id: Int!): Appointment
  }

  extend type Mutation {
    createAppointment(input: CreateAppointment!): Appointment!
    updateAppointment(id: Int!, input: UpdateAppointment!): Appointment!
    deleteAppointment(id: Int!): Appointment
  }
`
