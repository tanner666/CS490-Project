import React, { useState, useEffect } from 'react';

const FocusTime = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState('pomodoro');
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // Initial timer duration for Pomodoro in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState('Task Notes');

  const containerStyle = {
    position: 'absolute',
    width: '450px',
    height: '400px',
    top: '150px',
    left: '50%',
    marginLeft: '-200px', // Centering the element horizontally
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    boxShadow: '2px 5px 50px 0px rgba(36, 37, 40, 0.1)',
    zIndex: 999, // You can adjust the z-index as needed
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '20px', // Adjust the width as needed
    height: '20px', // Adjust the height as needed
  };

  const optionsContainerStyle = {
    textAlign: 'center',
    padding: '20px 0',
  };

  const optionStyle = {
    cursor: 'pointer',
    margin: '0 10px',
    padding: '10px',
    color: '#333',
    textDecoration: 'none',
    borderBottom: '2px solid transparent',
    fontFamily: 'DM Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'left',
  };

  const selectedOptionStyle = {
    color: 'blue',
    borderBottom: '2px solid blue',
  };

  const optionBoxStyle = {
    position: 'absolute',
    width: '420px',
    height: '160px',
    top: '65px',
    left: '50%',
    marginLeft: '-210px', // Centering the element horizontally
    borderRadius: '8px',
    backgroundColor: 'rgba(245, 247, 249, 1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centering the content vertically
    justifyContent: 'center', // Centering the content horizontally
  };

  const timerStyle = {
    fontFamily: 'DM Sans',
    fontSize: '70px',
    fontWeight: 700,
    lineHeight: '32px',
    letterSpacing: '0em',
    textAlign: 'center',
    marginBottom: '-50px',
  };

  const startStopButtonStyle = {
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    background: 'rgba(98, 132, 255, 1)',
    color: 'white',
    padding: '10px 30px',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '15px',
    letterSpacing: '0em',
    marginTop: '80px', // Space between timer and start/stop button
  };


  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setTimerSeconds(getInitialTimerDuration(option));
    setIsTimerRunning(false);
  };

  const getInitialTimerDuration = (option) => {
    switch (option) {
      case 'pomodoro':
        return 25 * 60;
      case 'shortBreak':
        return 5 * 60;
      case 'longBreak':
        return 15 * 60;
      default:
        return 25 * 60;
    }
  };

  const handleStartStopClick = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const taskNameTextStyle = {
    fontFamily: 'DM Sans',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'left',
    marginTop: '165px',
    marginLeft: '20px', // Adjust the margin as needed
    color: 'rgba(0, 0, 0, 1)',
  };

  const notesBoxStyle = {
    position: 'absolute',
    width: '420px',
    height: '60px',
    top: '260px',
    left: '20px',
    backgroundColor: 'rgba(245, 247, 249, 1)',
    borderRadius: '8px',
    padding: '10px',
  };

  const notesTextStyle = {
    fontFamily: 'DM Sans',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '21px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: 'rgba(98, 132, 255, 1)',
  };

  const editButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '12px',
    height: '12px',
  };

  const taskNotesTextStyle = {
    fontFamily: 'DM Sans',
    fontSize: '12px', // Adjust the font size as needed
    fontWeight: 500,
  };
  
  const editableTextStyle = {
    fontFamily: 'DM Sans',
    fontSize: '12px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 1)',
    padding: '10px',
    outline: 'none',
    margin: '0', // Add this line to remove the default margin
  };

  
  const handleEditButtonClick = () => {
    setIsEditingNotes(true);
  };

  const handleCheckboxClick = () => {
    setIsEditingNotes(false);
  };

  const [checkboxImage, setCheckboxImage] = useState(
    'https://drive.google.com/uc?id=13Qa4tAKL_0LYj8RYCgbktwhLQyHYhMyC'
  );

  const checkboxStyle = {
    cursor: 'pointer',
    width: '12px',
    height: '12px',
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(98, 132, 255, 1)',
    borderRadius: '3px',
    backgroundImage: `url(${checkboxImage})`, // Set the checkbox image
    backgroundSize: '7px 7px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
 
  const timersBoxStyle = {
    marginTop: '80px',
    width: '420px',
    height: '50px',
    backgroundColor: 'rgba(37, 38, 40, 1)',
    padding: '10px',
    display: 'flex',  // Add this line
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '8px',
    marginRight: '80px',
    position: 'absolute', 
    right: '-70px',
  };

  const timerIndicatorStyle = {
    marginLeft: '70px',
    marginRight: '5px',
    fontWeight: 700,
    color: 'white',
  };

  const finishAtStyle = {
    marginLeft: '40px',
    marginRight: '5px',
    fontWeight: 700,
    color: 'white',
  };
  
  const numberStyle = {
    color: 'rgba(64, 123, 255, 1)',
    fontWeight: 700,
  };

  const getFinishTime = (seconds) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + seconds);
  const finishTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  return finishTime;
};
 
  const finishTime = getFinishTime(timerSeconds);

  useEffect(() => {
    let timer;

    if (isTimerRunning && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isTimerRunning, timerSeconds]);

  return (
    <div style={containerStyle}>
      <img
        src="https://drive.google.com/uc?id=1VudJIDv_lVnYBlRQlWeiY3YJatBeWsfJ"
        alt="Close Button"
        style={closeButtonStyle}
      />
      <div style={optionsContainerStyle}>
        <span
          onClick={() => handleOptionClick('pomodoro')}
          style={{ ...optionStyle, ...(selectedOption === 'pomodoro' && selectedOptionStyle) }}
        >
          Pomodoro
        </span>
        <span
          onClick={() => handleOptionClick('shortBreak')}
          style={{ ...optionStyle, ...(selectedOption === 'shortBreak' && selectedOptionStyle) }}
        >
          Short Break
        </span>
        <span
          onClick={() => handleOptionClick('longBreak')}
          style={{ ...optionStyle, ...(selectedOption === 'longBreak' && selectedOptionStyle) }}
        >
          Long Break
        </span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={optionBoxStyle}>
          <div style={timerStyle}>{formatTime(timerSeconds)}</div>
          <button style={startStopButtonStyle} onClick={handleStartStopClick}>
            {isTimerRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
      <div style={taskNameTextStyle}>Task Name</div>
      <div style={notesBoxStyle}>
        <div style={notesTextStyle}>Notes</div>
        {isEditingNotes ? (
          <>
            <div
              contentEditable={true}
              style={editableTextStyle}
              onBlur={(e) => {
                setNotes(e.target.innerText);
                setIsEditingNotes(false);
              }}
            >
              {notes}
            </div>
            <div
              style={checkboxStyle}
              onClick={handleCheckboxClick}
            ></div>
          </>
        ) : (
          <>
            <div style={taskNotesTextStyle}>{notes}</div>
            <img
              src="https://drive.google.com/uc?id=17gw2LHM85_aRYh91KjKkjAkzIKMxkKHT"
              alt="Edit Button"
              style={editButtonStyle}
              onClick={handleEditButtonClick}
            />
          </>
        )}
      </div>
     <div style={timersBoxStyle}>
        <div style={timerIndicatorStyle}>Pomos:</div>
        <div style={numberStyle}> 0/3 </div>
        <div style={finishAtStyle}>Finish At: </div>
        <div style={numberStyle}> {finishTime} </div>
      </div>
    </div>
    
  );
};

export default FocusTime;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};
