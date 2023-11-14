import TaskCard from "../TaskCard/TaskCard"
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useTheme } from '../ThemeContext/ThemeContext'
import { Droppable, Draggable } from "react-beautiful-dnd"

const TaskGroup = ({groupTitle, tasks, onStatusChange}) => {
  const { theme } = useTheme();

  return (
    <Droppable droppableId={groupTitle.replace(/\s+/g, '')}>
    {(provided) =>(
    <div className={`mb-4 pb-1 min-h-[80px] rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-black'}` }
    {...provided.droppableProps} ref={provided.innerRef}>
      <h2 className="pl-2 pt-2 text-lg font-dm font-bold text-black">{groupTitle}</h2>
      {tasks.map((task) => (
        <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={task.order}>
        {(dragProvided) => (
          <div {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef} >
          <TaskCard task={task} onStatusChange={onStatusChange} />
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
