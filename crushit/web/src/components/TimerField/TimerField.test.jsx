import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { ThemeProvider } from '../ThemeContext/ThemeContext'

import TimerField from './TimerField' // Adjust the import path as needed

import {handlePodomoroChange} from 'web/src/components/settingsform/settingsform'

describe('TimerField Component', () => {
  const mockHandlePodomoroChange = jest.fn((e) => {
    e.target.value = '30'
    return e
  })
  const mockHandleShortBreakChange = jest.fn()
  const mockHandleLongBreakChange = jest.fn()

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
    )

    expect(screen.getByPlaceholderText(/Enter Pomodoro duration/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Short Break/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Long Break/i)).toBeInTheDocument()
  })

})
