import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimerField from './TimerField'; // Adjust the import path as needed
import { ThemeProvider } from '../ThemeContext/ThemeContext';

describe('TimerField Component', () => {
  const mockHandlePodomoroChange = jest.fn((e) => e.target.value);
  const mockHandleShortBreakChange = jest.fn();
  const mockHandleLongBreakChange = jest.fn();

  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <TimerField 
          podomoro={25} 
          shortBreak={5} 
          longBreak={15}
          handlePodomoroChange={mockHandlePodomoroChange}
          handleShortBreakChange={mockHandleShortBreakChange}
          handleLongBreakChange={mockHandleLongBreakChange}
          theme="light"
        />
      </ThemeProvider>
    );

    expect(screen.getByLabelText(/Podomoro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Short Break/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Long Break/i)).toBeInTheDocument();
  });

  it('calls handlePodomoroChange when Podomoro value is changed', () => {
    render(
      <ThemeProvider>
        <TimerField 
          podomoro={25} 
          shortBreak={5} 
          longBreak={15}
          handlePodomoroChange={mockHandlePodomoroChange}
          handleShortBreakChange={mockHandleShortBreakChange}
          handleLongBreakChange={mockHandleLongBreakChange}
          theme="light"
        />
      </ThemeProvider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/Podomoro/i), { target: { value: '30' } });
    
    // Check if the first argument of the first call to the function contains an object with a target.value of '30'
    expect(mockHandlePodomoroChange.mock.calls[0][0].target.value).toBe('30');
  });

  // Similar tests for shortBreak and longBreak
});

