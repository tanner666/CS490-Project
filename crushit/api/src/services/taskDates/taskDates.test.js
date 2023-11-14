import {
  taskDates,
  taskDate,
  createTaskDate,
  updateTaskDate,
  deleteTaskDate,
} from './taskDates'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('taskDates', () => {
  scenario('returns all taskDates', async (scenario) => {
    const result = await taskDates()

    expect(result.length).toEqual(Object.keys(scenario.taskDate).length)
  })

  scenario('returns a single taskDate', async (scenario) => {
    const result = await taskDate({ id: scenario.taskDate.one.id })

    expect(result).toEqual(scenario.taskDate.one)
  })

  scenario('creates a taskDate', async (scenario) => {
    const result = await createTaskDate({
      input: {
        day: 7127039,
        month: 5923806,
        year: 5053422,
        taskId: scenario.taskDate.two.taskId,
      },
    })

    expect(result.day).toEqual(7127039)
    expect(result.month).toEqual(5923806)
    expect(result.year).toEqual(5053422)
    expect(result.taskId).toEqual(scenario.taskDate.two.taskId)
  })

  scenario('updates a taskDate', async (scenario) => {
    const original = await taskDate({
      id: scenario.taskDate.one.id,
    })
    const result = await updateTaskDate({
      id: original.id,
      input: { day: 8150138 },
    })

    expect(result.day).toEqual(8150138)
  })

  scenario('deletes a taskDate', async (scenario) => {
    const original = await deleteTaskDate({
      id: scenario.taskDate.one.id,
    })
    const result = await taskDate({ id: original.id })

    expect(result).toEqual(null)
  })
})
