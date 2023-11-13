import React, { useEffect, useState } from 'react';
import TaskGroup from '../TaskGroup/TaskGroup';
import {useQuery} from '@redwoodjs/web';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
//import GetUserTasksOnDate from 'src/graphql/tasks.gql'
//import {QUERY} from 'src/graphql/tasks';

//query ... defiens a graphql query names userTasksON... with parameters (! means parameter is required)
//second line with userTasksOnDate corresponds to graphql schema resolver on server side
//inside this field, spcify data in GraphQL schema
  //inside this, specify what you want to retrieve (here is is an array of Tasks (per the gql schema def), all with the listed fields below)

const  GetUserTasksOnDate = gql` 
  query userTasksOnDate($userId: String!, $day: Int!, $month: Int!, $year: Int!) {
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

const CREATE_TASK_MUTATION = gql`
   mutation createTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      taskName
      ImportanceGroup
      completionStatus
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
    }
  }
`

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: Int!, $input: UpdateTaskInput!){
    updateTask(id: $id, input: $input){
      taskName
      ImportanceGroup
      completionStatus
      description
      pomodoroTimers
      pomodoroTimerType
      taskOrder
    }
  }
`

//ToDo is the parent task component, responsible for organizing and managing task groups and task cards
const ToDo = ({userId, day, month, year, formVisibility}) => {
  console.log("UserId in ToDo: ", userId);
  const {data, loading, error} = useQuery(GetUserTasksOnDate, {variables: {userId, day, month, year}});

  const [isFormVisibile, setIsFormVisible] = useState(false);

  //define three array groups
  const [tasks, setTasks] = useState({
    TopPriority: [],
    Important: [],
    Other: [],
  });

  //function to sort tasks into priority groups
  const sortTasks = (tasks) => {
    const sortedTasks = {
      TopPriority: [],
      Important: [],
      Other: [],
    };

    tasks.forEach(task => {
      switch(task.ImportanceGroup) {
        case 'TopPriority':
          sortedTasks.TopPriority.push(task);
          break;
        case 'Important':
          sortedTasks.Important.push(task);
          break;
        case 'Other':
          sortedTasks.Other.push(task);
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

  const handleFormSubmit = (newTask) => {
    // Implement logic to add the new task
    setIsFormVisible(false); // Hide form after submission
  };


  const handleStatusChange = (taskId, completed) => {
    // Find which group the task belongs to and update the task's completed status
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(prevState => !prevState);
  };


  return (
    <div className="todo-container">
      {formVisibility && (
        <div className="w-1/3 h-1/3 top-20 mx-auto my-auto left-20 fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <AddTaskForm userId={userId} day={day} month={month} year={year} onSubmit={handleFormSubmit} onCancel={toggleFormVisibility} />
        </div>
      )}
      <div className="p-6 my-2 w-full max-w-[52%] rounded-lg shadow-sm bg-white">
        
        <TaskGroup
          groupTitle="Top Priority"
          tasks={tasks.TopPriority}
          onStatusChange={handleStatusChange}
        />
         <TaskGroup
          groupTitle="Important"
          tasks={tasks.Important}
          onStatusChange={handleStatusChange}
        />
         <TaskGroup
          groupTitle="Other"
          tasks={tasks.Other}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default ToDo;


