import React from 'react';
import { render } from '@redwoodjs/testing';
import { ThemeProvider } from '../ThemeContext/ThemeContext'


import ToDoAndAppts from './ToDoAndAppts'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ToDoAndAppts', () => {
  it('renders successfully', () => {
    // Mock the setFocusTask function
    const mockSetFocusTask = jest.fn();

    // Render your component with the mock setFocusTask function as a prop
    const { getByTestId, getByText} = render(
      <ThemeProvider><ToDoAndAppts setFocusTask={mockSetFocusTask}/></ThemeProvider>
    );

    // Assert that setFocusTask was called
    expect(mockSetFocusTask).toHaveBeenCalled();

  })
})
