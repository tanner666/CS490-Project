import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import '@testing-library/jest-dom'
import { ThemeProvider } from '../ThemeContext/ThemeContext'

import TimerField from './TimerField' 

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

    expect(screen.getByLabelText(/Podomoro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Short Break/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Long Break/i)).toBeInTheDocument()
  })

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
    )

    fireEvent.change(screen.getByPlaceholderText(/Podomoro/i), {
      target: { value: '30' },
    })

    expect(mockHandlePodomoroChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '30' } })
    )
  })

})
