import { db } from 'src/lib/db'

export const tasks = () => {
  return db.task.findMany()
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask = ({ input }) => {
  return db.task.create({
    data: input,
  })
}

export const updateTask = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

//returns an array of tasks for a user on a specific date
export const userTasksOnDate = async ({ userId, day, month, year }) => {
  return await db.task.findMany({  where: {
    createdBy: userId, // the user's ID
    taskDates: {
      some: {
        day: day,
        month: month,
        year: year,
      },
    },
    },
    include: {
      taskDates: true, // to include the TaskDate data in the response
    },
  });
};

export const Task = {
  created_by: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).created_by()
  },
  taskDates: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).taskDates()
  },
}
