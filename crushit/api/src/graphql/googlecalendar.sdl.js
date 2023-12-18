export const schema = gql`
  type Event {
    summary: String!
    description: String
    start: String!
    end: String!
  }

  type Events {
    token: String!
    events: [Event!]
  }

  type Query {
    getEvents(start: String!, end: String!, uid: String!): Events @skipAuth
  }
`