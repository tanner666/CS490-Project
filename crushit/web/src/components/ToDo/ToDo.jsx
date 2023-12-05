import React, { useEffect, useState } from 'react';
import TaskGroup from '../TaskGroup/TaskGroup';

import { useMutation, useQuery } from '@redwoodjs/web';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTheme } from '../ThemeContext/ThemeContext';
import { object } from 'prop-types';

//import GetUserTasksOnDate from 'src/graphql/tasks.gql'
//import {QUERY} from 'src/graphql/tasks';


//query ... defiens a graphql query names userTasksON... with parameters (! means parameter is required)
//second line with userTasksOnDate corresponds to graphql schema resolver on server side
//inside this field, spcify data in GraphQL schema
//inside this, specify what you want to retrieve (here is is an array of Tasks (per the gql schema def), all with the listed fields below)


const GetUserTasksOnDate = gql`
  query userTasksOnDate($userId: String!, $day: Int!, $month: Int!, $year: Int!) {
    userTasksOnDate(userId: $userId, day: $day, month: $month, year: $year) {
      id
      taskName
      ImportanceGroup
      completionStatus
      taskStatus
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
      pomodoro{
        id
      }
    }
  }
`

const CREATE_TASK_MUTATION = gql`
  mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      taskName
      ImportanceGroup
      completionStatus
      taskStatus
      description
      pomodoroTimers
      pomodoroTimerType
      taskOrder
      createdBy
      taskDates {
        day
        month
        year
      }
      pomodoro{
        id
      }
    }
  }
`

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      taskName
      ImportanceGroup
      completionStatus
      description
      pomodoroTimers
      pomodoroTimerType
      taskOrder
      pomodoro{
        id
      }
    }
  }
`

//ToDo is the parent task component, responsible for organizing and managing task groups and task cards
const ToDo = ({ userId, day, month, year, formVisibility, toggleFormVisibility, toggleFocusTime, setFocusTask}) => {
  console.log("UserId in ToDo: ", userId);
  const { data, loading, error, refetch } = useQuery(GetUserTasksOnDate, { variables: { userId, day, month, year } });
  const [updateTasks] = useMutation(UPDATE_TASK_MUTATION);
  const { theme } = useTheme();

  const [isFormVisibile, setIsFormVisible] = useState(false);

  //define three array groups
  const [tasks, setTasks] = useState({
    'TopPriority': [],
    Important: [],
    Other: [],
  });

  const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
  const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);

  //function to sort tasks into priority groups
  const sortTasks = (tasks) => {
    const sortedTasks = {
      'TopPriority': [],
      Important: [],
      Other: [],
    };

    tasks.forEach(task => {
      switch (task.ImportanceGroup) {
        case 'TopPriority':
          // task.taskOrder = sortedTasks.TopPriority.length;
          // task.taskOrder = sortedTasks.TopPriority.length;
          sortedTasks["TopPriority"].push({ ...task, taskOrder: sortedTasks["TopPriority"].length });

          // console.log("TopPriority", sortedTasks.TopPriority);
          break;
        case 'Important':
          // task.taskOrder = sortedTasks.Important.length;
          sortedTasks.Important.push({ ...task, taskOrder: sortedTasks.Important.length });
          break;
        case 'Other':
          // task.taskOrder = sortedTasks.Other.length;
          sortedTasks.Other.push({ ...task, taskOrder: sortedTasks.Other.length });
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
    console.log("ToDo useEffect: ");
    if (data && data.userTasksOnDate) {
      const sortedTasks = sortTasks(data.userTasksOnDate);
      setTasks(sortedTasks);
      // console.log(tasks)
    }
  }, [data]);

  useEffect(() => {
    Object.keys(tasks).forEach((group) => {
      tasks[group].forEach((task) => {

      // updateTasks({variables: {id: task.id, input: {ImportanceGroup: task.ImportanceGroup, taskOrder: task.taskOrder}}})
        data.userTasksOnDate.filter((task2) =>{
          if(task.id == task2.id){
            if(task.ImportanceGroup !== task2.ImportanceGroup || task.taskOrder != task2.taskOrder){
              console.log("Updating Task: ", task, task2)
              updateTasks({ variables: { id: task.id, input: { ImportanceGroup: task.ImportanceGroup, taskOrder: task.taskOrder } } })
            }
          }
        })

      })
    })
    setFocusTask(getDefaultTaskForFocusTimer(tasks))
    console.log('updated task', getDefaultTaskForFocusTimer(tasks))

  }, [tasks]);

  const saveTimerCount = async (task, pomodoroCount) => {
    if(pomodoroCount > 0){
      const pomodoros = task.pomodoro ? [...task.pomodoro] : []
      if (pomodoroCount-task.pomodoroTimers > 0) {
        for (let i = 0; i < pomodoroCount-task.pomodoroTimers; i++) {
          pomodoros.push({ pomodoro: 30, short: 5, long: 15, userId: task.createdBy, taskId: task.id })
        }

      }
      console.log(pomodoros)
      await updateTasks({ variables: { id: task.id, input: { pomodoroTimers: pomodoroCount, pomodoro: pomodoros } } })
    }else{
      await updateTasks({ variables: { id: task.id, input: { pomodoroTimers: pomodoroCount} } })
    }
  }

  //need to retrieve info from useState and/or database for this
  const addTask = (group, newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [group]: [...prevTasks[group], newTask],
    }));
  };

  const handleFormSubmit = (newTask) => {
    // Implement logic to add the new task
    toggleFormVisibility()
    refetch();
  };


  const handleStatusChange = (taskId, completed) => {
    // Find which group the task belongs to and update the task's completed status
  };



  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return; // Task dropped outside of a droppable area
    }

    const sourceGroupId = result.source.droppableId;
    const destinationGroupId = result.destination.droppableId;

    const updatedTasks = { ...tasks };

    const [draggedTask] = updatedTasks[sourceGroupId].filter((task) => {
      if (task.id.toString() === result.draggableId)
        return task
    }
    );
    draggedTask.ImportanceGroup = destinationGroupId;
    updatedTasks[sourceGroupId] = updatedTasks[sourceGroupId].filter((task) => task.id.toString() !== result.draggableId);

    const newOrder = result.destination.index;

    if (destinationGroupId in updatedTasks) {
      updatedTasks[destinationGroupId].splice(newOrder, 0, {
        ...draggedTask,
        taskOrder: newOrder,
      });
    } else {
      updatedTasks[destinationGroupId] = [
        {
          ...draggedTask,
          taskOrder: newOrder,
        },
      ];
    }

    Object.keys(updatedTasks).forEach((group) => {
      for (let i = 0; i < updatedTasks[group].length; i++) {
        updatedTasks[group][i].taskOrder = i;
      }
    })

    setTasks(updatedTasks);
  }

  const getDefaultTaskForFocusTimer = (tasks) => {
    let defaultTask = null;
  
    const priorityGroups = ['TopPriority', 'Important', 'Other'];
  
    for (let i = 0; i < priorityGroups.length; i++) {
      const group = tasks[priorityGroups[i]];
      // console.log('finding tasks', group)
      if (group.length > 0) {
        for (let j = 0; j < group.length; j++) {
          const task = group[j];
          // Check if the task is incomplete
          if (task.completionStatus !== 'COMPLETED') {
            // If defaultTask is null or the task's group has a higher priority, update the defaultTask
            if (!defaultTask || priorityGroups.indexOf(task.ImportanceGroup) < priorityGroups.indexOf(defaultTask.ImportanceGroup)) {
              defaultTask = task;
            }
          }
        }
      }
    }
    return defaultTask;
  };

  const updateTaskInList = (updatedTask, taskGroup) => {
    // Logic to update the task list with the updated task
    // For example:
    console.log('updateTaskList',tasks[taskGroup])
    const updatedTasks = tasks[taskGroup].map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    let temp = tasks
    temp[taskGroup] = updatedTasks
    console.log('updateTaskList', temp, tasks)
    // console.log(''updatedTasks)
    // setTasks(updatedTasks);
  };
  
  

  return (
    <div className={`todo-container ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
      {formVisibility && (
        <div className="w-1/3 h-1/3 top-20 mx-auto my-auto left-20 fixed inset-0 bg-blue-500 shadow-lg rounded-xl bg-opacity-50 z-50 flex justify-center items-center">
          <AddTaskForm userId={userId} day={day} month={month} year={year} onSubmit={handleFormSubmit} onCancel={toggleFormVisibility} />
        </div>
      )}
        <div className={`p-6 my-2 w-full max-w-[98%] rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100`} style={{ height: "72vh" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <TaskGroup groupTitle="Top Priority" tasks={tasks["TopPriority"]} onStatusChange={handleStatusChange} saveTimerCount={saveTimerCount} toggleFocusTime={toggleFocusTime} updateTaskInList={updateTaskInList}/>
          <TaskGroup groupTitle="Important" tasks={tasks.Important} onStatusChange={handleStatusChange} saveTimerCount={saveTimerCount} toggleFocusTime={toggleFocusTime} updateTaskInList={updateTaskInList}/>
          <TaskGroup groupTitle="Other" tasks={tasks.Other} onStatusChange={handleStatusChange} saveTimerCount={saveTimerCount} toggleFocusTime={toggleFocusTime} updateTaskInList={updateTaskInList}/>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ToDo;
