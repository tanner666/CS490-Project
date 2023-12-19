import { render, screen, fireEvent } from '@redwoodjs/testing/web'
import { within } from '@testing-library/react'
import { ThemeProvider } from '../ThemeContext/ThemeContext'

import Appointments from './Appointments'

// Mock data for the GraphQL query
const mockEventsData = {
  getEvents: {
    events: [
      {
        summary: 'Meeting with Team',
        description: 'Discuss project progress',
        start: '2021-04-21T10:00:00Z',
        end: '2021-04-21T11:00:00Z',
      },
      // ... other events
    ],
  },
}

const mockTasks = {
  TopPriority: [
    { taskName: 'Task 1', /* other properties */ },
    { taskName: 'Task 2', /* other properties */ },
    // ... more tasks
  ],
  Important: [
    // ... tasks
  ],
  Other: [
    // ... tasks
  ],
};
/*
// Mock for the GET_EVENTS_QUERY
const mocks = [
  {
    request: {
      query: GET_EVENTS_QUERY,
      variables: {  },
    },
    result: {
      data: mockEventsData,
    },
  },
]*/

describe('Appointments Component', () => {
  it('renders correctly with data', async () => {
    render(
      <ThemeProvider>
        <Appointments start='2021-04-21T10:00:00Z'
        end= '2021-04-21T11:00:00Z' tasks={mockTasks} />
      </ThemeProvider>
    )
/*
    // Check for loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Check for successful data rendering
    await waitFor(() => {
      expect(screen.getByText('Meeting with Team')).toBeInTheDocument()
      // Add other expectations here
    })*/
  })

  // Add more tests to cover other scenarios and interactions
})
