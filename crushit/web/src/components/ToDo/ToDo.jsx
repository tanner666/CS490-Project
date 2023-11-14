import React, { useEffect, useState } from 'react';
import TaskGroup from '../TaskGroup/TaskGroup';
import {useQuery, useMutation} from '@redwoodjs/web';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { DragDropContext } from 'react-beautiful-dnd';

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
  const {data, loading, error, refetch} = useQuery(GetUserTasksOnDate, {variables: {userId, day, month, year}});
  const [updateTasks] = useMutation(UPDATE_TASK_MUTATION);
  
  const [isFormVisibile, setIsFormVisible] = useState(false);

  //define three array groups
  const [tasks, setTasks] = useState({
    'TopPriority': [],
    Important: [],
    Other: [],
  });

  //function to sort tasks into priority groups
  const sortTasks = (tasks) => {
    const sortedTasks = {
      'TopPriority': [],
      Important: [],
      Other: [],
    };

    tasks.forEach(task => {
      switch(task.ImportanceGroup) {
        case 'TopPriority':
          // task.taskOrder = sortedTasks.TopPriority.length;
          // task.taskOrder = sortedTasks.TopPriority.length;
          sortedTasks["TopPriority"].push({...task, order: sortedTasks["TopPriority"].length});
          // console.log("TopPriority", sortedTasks.TopPriority);
          break;
        case 'Important':
          // task.taskOrder = sortedTasks.Important.length;
          sortedTasks.Important.push({...task, order: sortedTasks.Important.length});
          break;
        case 'Other':
          // task.taskOrder = sortedTasks.Other.length;
          sortedTasks.Other.push({...task, order: sortedTasks.Other.length});
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
      console.log(tasks)
    }
  }, [data]);

  useEffect(() => {
    // Any code that depends on the updated tasks state should go here
    // Object.keys(tasks).forEach((group) => {
    //   tasks[group].forEach((task) => {
    //     if (task.ImportanceGroup !== group) {
    //       // The task's ImportanceGroup has changed, update it in the database
    //       const taskId = task.id; // Replace this with the actual ID retrieval for the task
    //       const newImportanceGroup = task.ImportanceGroup;
    //       console.log("taskId: ", task, taskId, newImportanceGroup);
    //       // Call the mutation to update the task's ImportanceGroup in the database
    //       // You'll need to pass taskId and newImportanceGroup as variables to the mutation
    //       // You may need to handle errors and loading states appropriately
    //       // Example:
    //       // updateTaskMutation({ variables: { id: taskId, input: { ImportanceGroup: newImportanceGroup } } });
    //     }
    //   });
    // });
    console.log(tasks)
    Object.keys(tasks).forEach((group) => {
      // console.log(group)
      tasks[group].forEach((task) => {
        // console.log(task)
        // console.log('data',data)
        data.userTasksOnDate.filter((task2) =>{ 
          if(task.id == task2.id){
            if(task.ImportanceGroup !== task2.ImportanceGroup){
              updateTasks({variables: {id: task.id, input: {ImportanceGroup: task.ImportanceGroup}}})
            }
          }
        })

      })
    })

    // console.log(data)
    
  }, [tasks]);


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
    refetch();
  };


  const handleStatusChange = (taskId, completed) => {
    // Find which group the task belongs to and update the task's completed status
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(prevState => !prevState);
  };


  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return; // Task dropped outside of a droppable area
    }
  
    // Get the source and destination group IDs
    const sourceGroupId = result.source.droppableId;
    const destinationGroupId = result.destination.droppableId;
  
    // Copy the tasks object to avoid mutating the state directly
    const updatedTasks = { ...tasks };
  
    // Get the task that was dragged
    const [draggedTask] = updatedTasks[sourceGroupId].filter((task) => {
      if(task.id.toString() === result.draggableId)
        return task
    }
      );
    draggedTask.ImportanceGroup = destinationGroupId;
    // Remove the task from the source group
    updatedTasks[sourceGroupId] = updatedTasks[sourceGroupId].filter((task) => task.id.toString() !== result.draggableId);
  
    // Determine the new order based on the destination index
    const newOrder = result.destination.index;
  
    // Insert the task into the destination group at the correct order
    if (destinationGroupId in updatedTasks) {
      updatedTasks[destinationGroupId].splice(newOrder, 0, {
        ...draggedTask,
        order: newOrder,
      });
    } else {
      updatedTasks[destinationGroupId] = [
        {
          ...draggedTask,
          order: newOrder,
        },
      ];
    }
  
    // Update the order of all tasks within the source and destination groups
    // updatedTasks[sourceGroupId] = updatedTasks[sourceGroupId].map((task, index) => ({
    //   ...task,
    //   order: index,
    // }));
    // if (destinationGroupId in updatedTasks) {
    //   updatedTasks[destinationGroupId] = updatedTasks[destinationGroupId].map((task, index) => ({
    //     ...task,
    //     order: index,
    //   }));
    // }
  
    // Update the state with the new tasks object
    setTasks(updatedTasks);
  }

  return (
    <div className="todo-container ">
      {formVisibility && (
        <div className="w-1/3 h-1/3 top-20 mx-auto my-auto left-20 fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ">
          <AddTaskForm userId={userId} day={day} month={month} year={year} onSubmit={handleFormSubmit} onCancel={toggleFormVisibility} />
        </div>
      )}
      <div className="p-6 my-2 w-full max-w-[52%] rounded-lg shadow-sm bg-white">
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <TaskGroup
          groupTitle="Top Priority"
          tasks={tasks["TopPriority"]}
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
        </DragDropContext>
      </div>
    </div>
  );
};

export default ToDo;


