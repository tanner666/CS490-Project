import { render } from '@redwoodjs/testing/web'
import { ThemeProvider } from '../ThemeContext/ThemeContext'


import ToDoAndAppts from './ToDoAndAppts'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ToDoAndAppts', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeProvider><ToDoAndAppts /></ThemeProvider>)
    }).not.toThrow()
  })
})
