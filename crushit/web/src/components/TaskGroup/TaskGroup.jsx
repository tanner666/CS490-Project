import TaskCard from "../TaskCard/TaskCard"
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useTheme } from '../ThemeContext/ThemeContext'


const TaskGroup = ({groupTitle, tasks, onStatusChange}) => {
  const { theme } = useTheme();

  return (
    <div className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-gray-900'}`}>
      <h2 className="text-lg font-semibold text-gray-700">{groupTitle}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  )
}

export default TaskGroup
