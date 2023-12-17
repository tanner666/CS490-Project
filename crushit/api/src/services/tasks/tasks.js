import { db } from 'src/lib/db'

export const tasks = () => {
  return db.task.findMany()
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask = async ({ input }) => {
  const user = await db.user.findUnique({
    where: { firebaseUid: input.createdBy },
  });

  if (!user) {
    throw new Error(user);
  }

  return db.task.create({
    data: {
      taskName: input.taskName,
      ImportanceGroup: input.ImportanceGroup,
      completionStatus: input.completionStatus,
      taskStatus: input.taskStatus,
      description: input.description,
      pomodoroTimers: input.pomodoroTimers,
      pomodoroTimerType: input.pomodoroTimerType,
      taskOrder: input.taskOrder,
      createdBy: input.createdBy,
      taskDates:{
        create: input.taskDates.map(date => ({
          day: date.day,
          month: date.month,
          year: date.year
        }))
      },
    },
  });
};


export const updateTask = async ({ id, input }) => {
  const {pomodoro} = input
  let createdPomodoros = []
  console.log("Updating Tasks", input)
  if(pomodoro && input.pomodoroTimers > 0){
      createdPomodoros = await Promise.all(
          pomodoro.map(async pomo => {
            const createdTimer = await db.pomodoroTimer.create({
                data:{
                  ...pomo
                }
            })
            return createdTimer
          })
      )
      // input.pomodoro = {connect: createdPomodoros.map(pomo => ({id: pomo.id}))}
      return await db.task.update({
        where: {id},
        data:{
          ...input,
          pomodoro:{
            connect: createdPomodoros.map(pomo => ({id: pomo.id}))
          }
        }
      })
  }else{
    const updatedTask = await db.task.update({
      where: {id},
      data:{
        ...input
      }
    })

    return updatedTask
  }

}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const updateTaskDescription = async ({ id, newDescription }) => {
  return db.task.update({
    where: { id },
    data: { description: newDescription },
  });
};

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
      taskDates: true,
    },
  });
};

export const rolloverTasks = async ({ createdBy }) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const tasksToRollover = await db.task.findMany({
    where: {
      createdBy: createdBy,
      completionStatus: false,
      taskStatus: { not: 'Rolled Over' },
      taskDates: {
        some: {
          OR: [
            { year: { lt: currentYear } },
            { AND: [{ year: currentYear }, { month: { lt: currentMonth } }] },
            { AND: [{ year: currentYear }, { month: currentMonth }, { day: { lt: currentDay } }] }
          ]
        }
      }
    },
    include: {
      taskDates: true
    }
  });
  await Promise.all(
    tasksToRollover.map(task =>
      db.task.update({
        where: { id: task.id },
        data: { taskStatus: 'Rolled Over' }
      })
    )
  );
  const topPriorityCount = tasksToRollover.filter(task => task.ImportanceGroup === 'TopPriority').length;
  const newTasks = await Promise.all(
    tasksToRollover.map((task, index) => {
      let newImportanceGroup = task.ImportanceGroup;
      if (topPriorityCount >= 3 && task.ImportanceGroup === 'TopPriority') {
        newImportanceGroup = 'Important';
      }
      return db.task.create({
        data: {
          taskName: task.taskName,
          ImportanceGroup: newImportanceGroup,
          completionStatus: false,
          taskStatus: 'Not Started',
          description: task.description,
          pomodoroTimers: task.pomodoroTimers,
          pomodoroTimerType: task.pomodoroTimerType,
          taskOrder: index,
          createdBy: task.createdBy,
          taskDates: {
            create: [{
              day: currentDate.getDate(),
              month: currentDate.getMonth() + 1,
              year: currentDate.getFullYear()
            }]
          },
        },
      });
    })
  );
  return newTasks;
};

export const Task = {
  created_by: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).created_by()
  },
  taskDates: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).taskDates()
  },
}

