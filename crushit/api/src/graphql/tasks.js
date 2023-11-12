//resolver for tasks services (so that we don't have to create one in the front-end component itself )
import { userTasksOnDate } from 'src/services/tasks/tasks'

//calls the function
export const Query = {
    userTasksOnDate: ({ userId, day, month, year }) => {
      return userTasksOnDate({ userId, day, month, year });
    },
  };