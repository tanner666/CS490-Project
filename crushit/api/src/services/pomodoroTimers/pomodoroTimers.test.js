import {
  pomodoroTimers,
  pomodoroTimer,
  createPomodoroTimer,
  updatePomodoroTimer,
  deletePomodoroTimer,
} from './pomodoroTimers'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pomodoroTimers', () => {
  scenario('returns all pomodoroTimers', async (scenario) => {
    const result = await pomodoroTimers()

    expect(result.length).toEqual(Object.keys(scenario.pomodoroTimer).length)
  })

  scenario('returns a single pomodoroTimer', async (scenario) => {
    const result = await pomodoroTimer({ id: scenario.pomodoroTimer.one.id })

    expect(result).toEqual(scenario.pomodoroTimer.one)
  })

  scenario('creates a pomodoroTimer', async (scenario) => {
    const result = await createPomodoroTimer({
      input: {
        pomodoro: 319392,
        short: 8564317,
        long: 9294482,
        userId: scenario.pomodoroTimer.two.userId,
      },
    })

    expect(result.pomodoro).toEqual(319392)
    expect(result.short).toEqual(8564317)
    expect(result.long).toEqual(9294482)
    expect(result.userId).toEqual(scenario.pomodoroTimer.two.userId)
  })

  scenario('updates a pomodoroTimer', async (scenario) => {
    const original = await pomodoroTimer({
      id: scenario.pomodoroTimer.one.id,
    })
    const result = await updatePomodoroTimer({
      id: original.id,
      input: { pomodoro: 9071667 },
    })

    expect(result.pomodoro).toEqual(9071667)
  })

  scenario('deletes a pomodoroTimer', async (scenario) => {
    const original = await deletePomodoroTimer({
      id: scenario.pomodoroTimer.one.id,
    })
    const result = await pomodoroTimer({ id: original.id })

    expect(result).toEqual(null)
  })
})
