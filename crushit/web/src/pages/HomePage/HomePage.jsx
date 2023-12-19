import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import ToDoAndAppts from 'src/components/ToDoAndAppts/ToDoAndAppts';
import FocusTime from 'src/components/FocusTime/FocusTime';
import AuthorizeCell from 'src/components/AuthorizeCell/AuthorizeCell'
import ThemeToggle from 'src/components/ThemeToggle/ThemeToggle';
import { useEffect, useState } from 'react';
import { getUserUid, useAuth } from 'src/auth';

const HomePage = () => {
  const [uid, setUID] = useState('');
  const [showFocusTime, setShowFocusTime] = useState(false); // State to control visibility
  const [FocusTask, setFocusTask] = useState(null);
  const [pomoAvailable, setPomoAvailable] = useState(false);

  const [timerValue, setTimerValue] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTask, setTimerTask] = useState(null);
  const [isTimerPomo, setIsTimerPomo] = useState(false)

  const [timerSeconds, setTimerSeconds] = useState(0); // Initial timer duration for Pomodoro in seconds



  const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log("Is Authenticated: ", isAuthenticated);

if (!isAuthenticated) {
        console.log("Google sign in, code: ");
   return <AuthorizeCell></AuthorizeCell>
  }

  //change these to retreive the current values in the navigation bar
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Month is 0-indexed
  const year = currentDate.getFullYear();
  const formattedMonth = month.toString().padStart(2,'0');
  const formattedDay = day.toString().padStart(2, '0');
  currentDate.setDate(currentDate.getDate() - 1);
  const month2 = currentDate.getMonth() + 1; // Month is 0-indexed
  const year2 = currentDate.getFullYear();
  const formattedMonth2 = month.toString().padStart(2,'0');
  const day2 = currentDate.getDate();
  const formattedDay2 = day2.toString().padStart(2, '0');


  //once other issue is fixed, use these values below
  const start = `${year}-${formattedMonth}-${formattedDay}T19:00:00Z`;
  const end = `${year}-${formattedMonth}-${formattedDay}T18:59:59Z`;
  //const start = '2023-12-04T12:00:00Z'
  //const end = '2023-12-05T12:00:00Z'

  const handleTimerOnDelete = ()=>{
    setTimerTask(null);
    setIsTimerRunning(false)   
  }

  // For timer
  useEffect(() => {
    let timer;
    console.log("Timer seconds:", timerSeconds);

    if (isTimerRunning && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }else if(isTimerRunning && timerSeconds == 0){
      setIsTimerRunning(false);
        console.log("Pomos completed");
        // toggle focus timer for selected task
        if(!showFocusTime)
          toggleFocusTime(timerTask, timerTask.pomodoroTimers)
        // setPomosCompleted(pomosCompleted+1);
        // console.log("Pomos completed: ", pomosCompleted);
        // updateTask({variables: {id: task.id, input: {pomodorosCompleted: task.pomodorosCompleted+1}}});

        // handleOptionClick("shortBreak");
      
      //setIsTimerRunning(true);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = (timeVal) => {
    setIsTimerRunning(true);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setShowFocusTime(true);
  };


  useEffect(() => {
    console.log('uid:', uid);
    getUserUid()
      .then((uid) => {
        setUID(uid);
      })
      .catch((error) => {
        console.log('Errorm:', error);
      });
  }, []);

  useEffect(() => {
    console.log('current focus,', FocusTask)
  },[FocusTask]);

  const handleClose = () => {
    setShowFocusTime(false); // This function will close the FocusTime component
  };


  const toggleFocusTime = (task, pomoCount) => {
    // console.log('POMO COUNT', pomoCount);
    setPomoAvailable(pomoCount > 0);
    setFocusTask(task);
    setShowFocusTime(prevState => !prevState); // Toggle the state of showFocusTime
  };

  //passes the current date when initially loading page

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.3)', // Adjust the alpha channel for transparency
    zIndex: 1000, // Make sure it's above other elements
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {/*
      <div className="border rounded-lg p-4 max-w-md border-gray-200">
          <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowEvents(true)}
          >
              Appointments
          </button>
      </div>

      {showEvents ? (
        <AppointmentCell
          start={start}
          end={end}
          code={code}
          uid={uid}
        ></AppointmentCell>
      ) : (
        <div></div>
      )}
      */}

      <div>
        {uid ? (
          <>
            <ToDoAndAppts userId={uid} day={day} month={month} year={year} start={start} end={end} toggleFocusTime={toggleFocusTime} setFocusTask={setFocusTask} isRunning={isTimerRunning} pomoTask={timerTask} setRunning={handleTimerOnDelete} />
            {showFocusTime && (
            <>
               <div style={overlayStyles}>
                 <FocusTime userId={uid} onClose={handleClose} task={FocusTask} isPomoRunning={isTimerRunning} timerSeconds={timerSeconds} setTimerSeconds={setTimerSeconds} setIsPomoRunning={setIsTimerRunning} setPomoTask={setTimerTask} pomoTask={timerTask} isTimerPomo={isTimerPomo} setIsTimerPomo={setIsTimerPomo}></FocusTime>
                 {/* handleSelectTask={handleSelectTask} selectedTask={selectedTask} */}
               </div>
            </>
          )}
            </>
         ) : (
           <p>Loading or no UID available...</p>
         )}
      </div>
    </>
  );
};

export default HomePage;