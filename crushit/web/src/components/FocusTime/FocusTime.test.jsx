import { render, screen, waitFor, fireEvent } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'

import FocusTime from './FocusTime'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components


const mockedTask = {
  id: 1,
  description: 'Mocked Task Description',
  taskName: 'Mocked Task',
  pomodoro: [
    {
      id: 1,
      currentPomo: 25,
      currentShort: 5,
      currentLong: 15,
    },
  ],
  pomodorosCompleted: 0,
  pomodoroTimers: 4,
};

const mockedTask2 = {
  id: 2,
  description: 'Mocked Task Description',
  taskName: 'Mocked Task',
  pomodoro: [
    {
      id: 1,
      currentPomo: 25,
      currentShort: 5,
      currentLong: 15,
    },
  ],
  pomodorosCompleted: 0,
  pomodoroTimers: 4,
};


describe('FocusTime', () => {
  const onClose = jest.fn(); // Mock function for onClose
  const isPomoRunning = false;
  const timerSeconds = 1500;
  const setIsPomoRunning = jest.fn(); // Mock function for setIsPomoRunning
  const setPomoTask = jest.fn(); // Mock function for setPomoTask
  const setIsTimerPomo = jest.fn(); // Mock function for setIsTimerPomo
  it('renders successfully', () => {
    expect(() => {
      render(
        <FocusTime
          userId="mockUserId"
          onClose={onClose}
          task={mockedTask}
          isPomoRunning={isPomoRunning}
          timerSeconds={timerSeconds}
          setIsPomoRunning={setIsPomoRunning}
          setPomoTask={setPomoTask}
          setIsTimerPomo={setIsTimerPomo}
          setTimerSeconds={()=>{}}
        />
      );
    }).not.toThrow();
  });


  it('renders the options correctly', () => {
    render(        <FocusTime
      userId="mockUserId"
      onClose={onClose}
      task={mockedTask}
      isPomoRunning={isPomoRunning}
      timerSeconds={timerSeconds}
      setIsPomoRunning={setIsPomoRunning}
      setPomoTask={setPomoTask}
      setIsTimerPomo={setIsTimerPomo}
      setTimerSeconds={()=>{}}
    />)
    const pomodoroOption = screen.getByText('Pomodoro')
    const shortBreakOption = screen.getByText('Short Break')
    const longBreakOption = screen.getByText('Long Break')

    expect(pomodoroOption).toBeInTheDocument()
    expect(shortBreakOption).toBeInTheDocument()
    expect(longBreakOption).toBeInTheDocument()
  })

  it('changes the selected option when clicked', async() => {
    render(<FocusTime
      userId="mockUserId"
      onClose={onClose}
      task={mockedTask}
      isPomoRunning={isPomoRunning}
      timerSeconds={timerSeconds}
      setIsPomoRunning={setIsPomoRunning}
      setPomoTask={setPomoTask}
      setIsTimerPomo={setIsTimerPomo}
      setTimerSeconds={()=>{}}
    />)
    const pomodoroOption = screen.getByText('Pomodoro')
    const shortBreakOption = screen.getByText('Short Break')
    const longBreakOption = screen.getByText('Long Break')

    userEvent.click(shortBreakOption)
    await waitFor(() => {
      expect(pomodoroOption).not.toHaveStyle('color: blue')
      expect(shortBreakOption).toHaveStyle('color: blue')
      expect(longBreakOption).not.toHaveStyle('color: blue')
    })

    userEvent.click(longBreakOption)
    await waitFor(() => {
      expect(pomodoroOption).not.toHaveStyle('color: blue')
      expect(shortBreakOption).not.toHaveStyle('color: blue')
      expect(longBreakOption).toHaveStyle('color: blue')
    })
  })

  it('starts and stops the timer when start/stop button is clicked', async () => {
    render(<FocusTime
      userId="mockUserId"
      onClose={onClose}
      task={mockedTask}
      isPomoRunning={false}
      timerSeconds={timerSeconds}
      setIsPomoRunning={setIsPomoRunning}
      setPomoTask={setPomoTask}
      setIsTimerPomo={setIsTimerPomo}
      setTimerSeconds={()=>{}}
      pomoTask={mockedTask}
    />)
    // Check if the button text is 'Start'
    const startStopButton = screen.getByTestId('stopStart')
    expect(startStopButton).toHaveTextContent('Start');

    await waitFor(() => {
      userEvent.click(startStopButton);
      expect(startStopButton).toHaveTextContent('Stop');
    });
  })

  it('timer does not start if pomoTask is not current task', async () => {
    render(<FocusTime
      userId="mockUserId"
      onClose={onClose}
      task={mockedTask}
      isPomoRunning={false}
      timerSeconds={timerSeconds}
      setIsPomoRunning={setIsPomoRunning}
      setPomoTask={setPomoTask}
      setIsTimerPomo={setIsTimerPomo}
      setTimerSeconds={()=>{}}
      pomoTask={mockedTask2}
    />)
    // Check if the button text is 'Start'
    const startStopButton = screen.getByTestId('stopStart')
    expect(startStopButton).toHaveTextContent('Start');

    await waitFor(() => {
      userEvent.click(startStopButton);
      expect(startStopButton).toHaveTextContent('Start');
    });
  })

    it('renders FocusTime component with correct timer values for pomodoro', () => {
    render(<FocusTime       userId="mockUserId"
    onClose={onClose}
    task={mockedTask}
    isPomoRunning={false}
    timerSeconds={timerSeconds}
    setIsPomoRunning={setIsPomoRunning}
    setPomoTask={setPomoTask}
    setIsTimerPomo={setIsTimerPomo}
    setTimerSeconds={()=>{}}
    pomoTask={mockedTask}
  />);

    const pomodoroOption = screen.getByText('Pomodoro');

    userEvent.click(pomodoroOption);
    const pomodoroTimerElement = screen.getByText('25:00');
    expect(pomodoroTimerElement).toBeInTheDocument();
  });

    it('renders the formatted time correctly', () => {
      render(<FocusTime       userId="mockUserId"
      onClose={onClose}
      task={mockedTask}
      isPomoRunning={false}
      timerSeconds={timerSeconds}
      setIsPomoRunning={setIsPomoRunning}
      setPomoTask={setPomoTask}
      setIsTimerPomo={setIsTimerPomo}
      setTimerSeconds={()=>{}}
      pomoTask={mockedTask}
    />);
    const time = 1500; // 25 minutes in seconds
    const formattedTime = '25:00';

    const formattedTimeElement = screen.getByText(formattedTime);
    expect(formattedTimeElement).toBeInTheDocument();
  });

  it('renders correct time if pomotask and time is diff', () => {
    render(<FocusTime       userId="mockUserId"
    onClose={onClose}
    task={mockedTask}
    isPomoRunning={true}
    timerSeconds={1320}
    setIsPomoRunning={setIsPomoRunning}
    setPomoTask={setPomoTask}
    setIsTimerPomo={setIsTimerPomo}
    setTimerSeconds={()=>{}}
    pomoTask={mockedTask}
  />);
  const time = 1320; // 25 minutes in seconds
  const formattedTime = '22:00';

  const formattedTimeElement = screen.getByText(formattedTime);
  expect(formattedTimeElement).toBeInTheDocument();
}); 
it('renders correct time if not pomotask, and time is diff', () => {
  render(<FocusTime       userId="mockUserId"
  onClose={onClose}
  task={mockedTask}
  isPomoRunning={true}
  timerSeconds={1320}
  setIsPomoRunning={setIsPomoRunning}
  setPomoTask={setPomoTask}
  setIsTimerPomo={setIsTimerPomo}
  setTimerSeconds={()=>{}}
  pomoTask={mockedTask2}
/>);
const time = 1320; // 25 minutes in seconds
const formattedTime = '25:00';

const formattedTimeElement = screen.getByText(formattedTime);
expect(formattedTimeElement).toBeInTheDocument();
}); 
})
