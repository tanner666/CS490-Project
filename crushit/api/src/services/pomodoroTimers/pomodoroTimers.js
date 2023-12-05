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
  console.log('Input\n',input);
  const defaultValues = {
    currentPomo: input.pomodoro, // Default value for currentPomo
    currentShort: input.short, // Default value for currentShort
    currentLong: input.long, // Default value for currentLong
  };

  const dataWithDefaults = {
    ...defaultValues,
    ...input,
  };

  console.log('Data with defaults\n',dataWithDefaults);

  return db.pomodoroTimer.create({
    data: dataWithDefaults,
  });
};


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
