import { render } from '@redwoodjs/testing/web'

import AddTaskForm from './AddTaskForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddTaskForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddTaskForm />)
    }).not.toThrow()
  })
})
