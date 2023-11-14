import TaskGroup from "../TaskGroup/TaskGroup"
import { useTheme } from '../ThemeContext/ThemeContext'
import { Draggable } from "react-beautiful-dnd"
import { useState } from 'react';


const TaskCard = ({ task, onStatusChange, saveTimerCount }) => {
  const [pomodoroCount, setPomodoroCount] = useState(task.pomodoroTimers);
  const [showButtons, setShowButtons] = useState(false);
  const [imageSrc, setImageSrc] = useState('https://i.imgur.com/ALJOHMN.png');
  const [imageSize, setImageSize] = useState({ width: 16, height: 16 });


  const handleIncrement = () => {
    setPomodoroCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (pomodoroCount > 0) {
      setPomodoroCount(prevCount => prevCount - 1);
    }
  };

  const toggleButtons = () => {
    const newImageSrc =
    imageSrc === 'https://i.imgur.com/ALJOHMN.png'
      ? 'https://i.imgur.com/aLhz1Kz.png'
      : 'https://i.imgur.com/ALJOHMN.png';
    setImageSrc(newImageSrc);
    
    setShowButtons(prevShowButtons => !prevShowButtons);
    if(showButtons){
        saveTimerCount(task.id, pomodoroCount);
    }
  };
  return (

    <div className="p-2 my-3 mx-auto w-full w-[94%] rounded-lg shadow-sm bg-white font-dm font-bold">

      <div className="task-card flex items-center mt-1">
        <h3>{task.title}</h3>
        {/* REplaced this checkbox with status images */}
        <button className='w-7 h-7' onClick={() => onStatusChange(task.id, !task.completed)}>
          <img src="https://drive.google.com/uc?export=view&id=1JbmEUFBK5MHBXKQNh0MvHDI8eSG8z1sP" />
        </button>
        <p className="ml-2 text-md text-task-blue">{task.taskName}</p>

      </div>
      <div className="border mt-2 mx-auto h-0.4 w-[98%] bg-bar-grey"></div>
      <div className="flex items-center justify-between mx-1 mt-3">
      <p className="text-xs text-task-black">Number of Pomodoro Timers (30 mins each) </p>
      <div className="flex items-center">
        {showButtons && (
          <>
            <button onClick={handleDecrement} className="focus:outline-none">
              <img src="https://i.imgur.com/psv7bFF.png"  width={imageSize.width} height={imageSize.height} />
            </button>
            </>
        )}
            <p className="text-xs text-timer-orange mx-2">{pomodoroCount}</p>
            {showButtons && (
          <>
          <button onClick={handleIncrement} className="focus:outline-none">
              <img src="https://i.imgur.com/Zm4t7vG.png"  width={imageSize.width} height={imageSize.height} />
            </button>
          </>
        )}
        <button onClick={toggleButtons} className="focus:outline-none le" style={{ marginLeft: '32px' }}>
          <img src={imageSrc} width={imageSize.width} height={imageSize.height} alt="Toggle Image" />
        </button>
      </div>
    </div>
      <p className="text-xs font-medium text-notes-grey mt-4 mx-1">Notes</p>
      <p className="whitespace-normal break-words text-sm text-task-black w-full mx-1 rounded-md mt-1 pt-1 pb-1">
        {task.description}
      </p>

    </div>

  )
}

export default TaskCard
