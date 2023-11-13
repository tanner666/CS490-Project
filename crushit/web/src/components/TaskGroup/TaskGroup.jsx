import TaskCard from "../TaskCard/TaskCard"
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useTheme } from '../ThemeContext/ThemeContext'


const TaskGroup = ({groupTitle, tasks, onStatusChange}) => {
  const { theme } = useTheme();

  return (
    <div className={`mb-4 min-h-[44px] rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-light-gray text-black'}`}>
      <h2 className="pl-2 pt-2 text-lg font-dm font-bold text-black">{groupTitle}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  )
}

export default TaskGroup
