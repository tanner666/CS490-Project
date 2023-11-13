import React, { useState } from 'react';
import TaskGroup from '../TaskGroup/TaskGroup';
import {useQuery} from '@redwoodjs/web';
import {QUERY} from 'src/graphql/path-to-your-query';

//replace title/podomorTimer, etc with stuff retrieved from databse
//ToDo is the parent task component, responsible for organizing and managing task groups and task cards
const ToDo = () => {
  const {data, loading,error} = useQuery(QUERY, {variables: {userId, day, month, year}})

  const [tasks, setTasks] = useState({
    topPriority: [],
    important: [],
    other: [],
  });

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


