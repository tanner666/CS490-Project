import { userTasksOnDate } from './tasks'

export const standard = defineScenario({
  task: {
    one: {
      data: {
        taskName: 'String',
        pomodoroTimers: 1074233,
        taskOrder: 5830816,
        created_by: {
          create: {
            username: 'String',
            email: 'String5957201',
            firebaseUid: 'String2835309',
          },
        },
      },
    },
    two: {
      data: {
        taskName: 'String',
        pomodoroTimers: 8672582,
        taskOrder: 4034550,
        created_by: {
          create: {
            username: 'String',
            email: 'String9171013',
            firebaseUid: 'String9239233',
          },
        },
        taskDates: {
          create:{
            day: 1,
            month: 1,
            year: 2023,
          }
        }
      },
    },
  },
})

export const resolvers = {
  Query: {
    userTasksOnDate: (_obj, { userId, day, month, year }) => {
      return userTasksOnDate({ userId, day, month, year })
    },
  },
}
