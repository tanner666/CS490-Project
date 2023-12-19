import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from '../ThemeContext/ThemeContext';
import AddTaskForm from './AddTaskForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddTaskForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeProvider><AddTaskForm /></ThemeProvider>)
    }).not.toThrow()
  })
})