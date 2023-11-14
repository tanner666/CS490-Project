import { db } from 'src/lib/db'

export const taskDates = () => {
  return db.taskDate.findMany()
}

export const taskDate = ({ id }) => {
  return db.taskDate.findUnique({
    where: { id },
  })
}

export const createTaskDate = ({ input }) => {
  return db.taskDate.create({
    data: input,
  })
}

export const updateTaskDate = ({ id, input }) => {
  return db.taskDate.update({
    data: input,
    where: { id },
  })
}

export const deleteTaskDate = ({ id }) => {
  return db.taskDate.delete({
    where: { id },
  })
}

export const TaskDate = {
  task: (_obj, { root }) => {
    return db.taskDate.findUnique({ where: { id: root?.id } }).task()
  },
}
