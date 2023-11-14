import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'
import { Draggable } from "react-beautiful-dnd"


const TaskCard = ({ task, onStatusChange }) => {
  return (
      <div className="p-2 my-3 mx-auto w-full w-[94%] rounded-lg shadow-sm bg-white font-dm font-bold">

        <div className="task-card flex items-center mt-1">
        <h3>{task.title}</h3>
        {/* REplace this checkbox with status images */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onStatusChange(task.id, e.target.checked)}
            className="form-checkbox h-4 w-5"
          />
          <p className="ml-2 text-md text-task-blue">{task.taskName}</p>
        </div>
        <div className="border mt-2 mx-auto h-0.4 w-[98%] bg-bar-grey"></div>
        <div className="flex items-center justify-between mx-1 mt-3">
          <p className="text-xs text-task-black">Number of Pomodoro Timers (30 mins each) </p>
          <p className="text-xs text-timer-orange mr-8">{task.pomodoroTimers}</p>
        </div>
        <p className="text-xs font-medium text-notes-grey mt-4 mx-1">Notes</p>
        <p className="whitespace-normal break-words text-sm text-task-black w-full mx-1 rounded-md mt-1 pt-1 pb-1">
          {task.description}
        </p>
        
      </div>

  )
}

export default TaskCard
