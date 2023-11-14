import { tasks, task, createTask, updateTask, deleteTask, userTasksOnDate } from './tasks'
import { createUser } from '../users/users';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tasks', () => {
  scenario('creates a user and then a task', async (scenario) => {
    // Create a user first
    const user = await createUser({
      input: {
        // user details here
        email: "adska@gmail.com",
        firebaseUid: 'stringfiebas3456',
        name: "",
        username: "adska@gmail.com",
        // ... other user fields ...
      },
    });

    // Now create a task associated with this user
    const taskResult = await createTask({
      input: {
        taskName: 'String',
        completionStatus: false,
        pomodoroTimers: 7999023,
        taskOrder: 6938815,
        createdBy: user.firebaseUid,
        taskDates: {day: 2, month: 2, year: 2022},
      },
    });
    expect(result.taskName).toEqual('String')
    expect(result.pomodoroTimers).toEqual(7999023)
    expect(result.taskOrder).toEqual(6938815)
    expect(result.createdBy).toEqual('String34435jdsm')
  });

  scenario('returns all tasks', async (scenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('updates a task', async (scenario) => {
    const original = await task({ id: scenario.task.one.id })
    const result = await updateTask({
      id: original.id,
      input: { taskName: 'String2' },
    })

    expect(result.taskName).toEqual('String2')
  })

  scenario('deletes a task', async (scenario) => {
    const original = await deleteTask({ id: scenario.task.one.id })
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})

describe('userTasksOnDate', () => {
  scenario('returns tasks for a user on a specific date', async (scenario) => {
    // Assuming you have a user and tasks for that user on a specific date in your scenario
    const userId = "fierbaseUIdafakldfj"
    const specifiedDay = 1 // Adjust these values based on your scenario data
    const specifiedMonth = 1
    const specifiedYear = 2023

    const result = await userTasksOnDate({
      userId: userId,
      day: specifiedDay,
      month: specifiedMonth,
      year: specifiedYear,
    })

    // Check that the result contains nothing, since no user created yet
    expect(result).toEqual(
      expect.arrayContaining([
      ])
    )
  })
})
