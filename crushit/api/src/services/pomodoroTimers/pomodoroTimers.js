import { db } from 'src/lib/db'

export const pomodoroTimers = () => {
  return db.pomodoroTimer.findMany()
}

export const pomodoroTimer = ({ id }) => {
  return db.pomodoroTimer.findUnique({
    where: { id },
  })
}

export const createPomodoroTimer = ({ input }) => {
  return db.pomodoroTimer.create({
    data: input,
  })
}

export const updatePomodoroTimer = ({ id, input }) => {
  return db.pomodoroTimer.update({
    data: input,
    where: { id },
  })
}

export const deletePomodoroTimer = ({ id }) => {
  return db.pomodoroTimer.delete({
    where: { id },
  })
}

export const PomodoroTimer = {
  user: (_obj, { root }) => {
    return db.pomodoroTimer.findUnique({ where: { id: root?.id } }).user()
  },
}
