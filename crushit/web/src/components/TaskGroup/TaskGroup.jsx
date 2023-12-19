import TaskCard from "../TaskCard/TaskCard"
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useTheme } from '../ThemeContext/ThemeContext'
import { Droppable, Draggable } from "react-beautiful-dnd"

const TaskGroup = ({groupTitle, tasks, onStatusChange, saveTimerCount, toggleFocusTime, updateTaskInList, isRunning, pomoTask, setRunning, setTasksGroup}) => {
  const theme= useTheme();

  const updateTaskListOnChange = (task, group) => {
    const updatedTasks = [];
    // const taskIndex = updatedTasks[group].findIndex((t) => t.id === task.id);
    console.log("DELETING TASK", updatedTasks, tasks, task)
      console.log("DELETING TASK")
      for (const key in tasks) {
        if(tasks[key].id != task.id) {
          updatedTasks.push(tasks[key])
        }
      }
      // Update the 'tasks' state with the modified tasks object
      setTasksGroup(updatedTasks, group);
  }

  return (
    <Droppable droppableId={groupTitle.replace(/\s+/g, '')}>
    {(provided) =>(
    <div className={`mb-4 pb-1 min-h-[80px] rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-black'}` }
    {...provided.droppableProps} ref={provided.innerRef}>
      <h2 className="pl-2 pt-2 text-lg font-dm font-bold text-black">{groupTitle}</h2>
      {tasks.map((task) => (
        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={task.taskOrder}>
        {(dragProvided) => (
          <div {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef}  >
          <TaskCard task={task} onStatusChange={onStatusChange} saveTimerCount={saveTimerCount} toggleFocusTime={toggleFocusTime} updateTaskInList={updateTaskInList} group={groupTitle.replace(/\s+/g, '')} isRunning={isRunning} pomoTask={pomoTask} setRunning={setRunning} updateTaskListOnChange={updateTaskListOnChange} />
          </div>
        )}
      </Draggable>
      ))}
      {provided.placeholder}
    </div>
    )}
    </Droppable>
  )
}

export default TaskGroup
