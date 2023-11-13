import React, { useEffect, useState } from 'react';
import TaskGroup from '../TaskGroup/TaskGroup';
import {useQuery} from '@redwoodjs/web';
//import GetUserTasksOnDate from 'src/graphql/tasks.gql'
//import {QUERY} from 'src/graphql/tasks';

//query ... defiens a graphql query names userTasksON... with parameters (! means parameter is required)
//second line with userTasksOnDate corresponds to graphql schema resolver on server side
//inside this field, spcify data in GraphQL schema
  //inside this, specify 

const Get_Tasks_For_Date = gql` 
  query userTasksOnDate($userId: Int!, $day: Int!, $month: Int!, $year: Int!) {
    userTasksOnDate(userId: $userId, day: $day, month: $month, year: $year) {
      id
      taskName
      ImportanceGroup
      completionStatus
      description
      pomodoroTimers
      pomodoroTimerType
      taskOrder
      createdBy
      taskDates {
        id
        day
        month
        year
      }
    }
  }
`;
//replace title/podomorTimer, etc with stuff retrieved from databse
//ToDo is the parent task component, responsible for organizing and managing task groups and task cards
const ToDo = () => {
  const {data, loading, error} = useQuery(GetUserTasksOnDate, {variables: {userId, day, month, year}});

  //define three array groups
  const [tasks, setTasks] = useState({
    topPriority: [],
    important: [],
    other: [],
  });

  //function to sort tasks
  const sortTasks = (tasks) => {
    const sortedTasks = {
      topPriority: [],
      important: [],
      other: [],
    };

    tasks.forEach(task => {
      switch(task.ImportanceGroup) {
        case 'topPriority':
          sortedTasks.topPriority.push(task);
          break;
        case 'important':
          sortedTasks.important.push(task);
          break;
        case 'other':
          sortedTasks.other.push(task);
          break;
        default:
          // Handle tasks with no or unrecognized importance group
          break;
      }
    });

    return sortedTasks;
  };

  // Effect to update tasks when data is fetched
  useEffect(() => {
    if (data && data.userTasksOnDate) {
      const sortedTasks = sortTasks(data.userTasksOnDate);
      setTasks(sortedTasks);
    }
  }, [data]);


  //need to retrieve info from useState and/or database for this
  const addTask = (group, newTask) =>{
    setTasks((prevTasks) => ({
      ...prevTasks,
      [group]: [...prevTasks[group], newTask],
    }));
  };

  const handleStatusChange = (taskId, completed) => {
    // Find which group the task belongs to and update the task's completed status
  };

  useEffect(() => {
    // console.log(data)
    if (data && data.user) {
        // Check if data is available and user object exists
        const { name, pomodoroLength, pomodoroShort, pomodoroLong, darkMode } = data.user;
        let firstName = name.split('|')[0];
        let lastName = name.split('|')[1];
        //   console.log(firstName, lastName, data.user);
        if (firstName && lastName) {
            setFirstName(firstName);
            setLastName(lastName);
        }
        if (pomodoroLength && pomodoroShort && pomodoroLong) {
            setPodomoro(pomodoroLength);
            setShortBreak(pomodoroShort);
            setLongBreak(pomodoroLong);
        }
        //   console.log(data.user, podomoroLength)
        //   console.log("names",firstName, lastName, podomoro, shortBreak, longBreak);
        // Update other state variables if needed
    }
}, [data]);

  return (
    <div className="todo-container">
      <button onClick={() => addTask('topPriority', { id: Date.now(), title: 'New Task', completed: false })}>
          Tasks
        </button>
      <div className="border-gray-300 border p-4 my-4 mx-auto w-full max-w-xs rounded-md shadow-sm bg-white">
        
        <TaskGroup
          groupTitle="Top Priority"
          tasks={tasks.topPriority}
          onStatusChange={handleStatusChange}
        />
         <TaskGroup
          groupTitle="Important"
          tasks={tasks.important}
          onStatusChange={handleStatusChange}
        />
         <TaskGroup
          groupTitle="Other"
          tasks={tasks.other}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default ToDo;


