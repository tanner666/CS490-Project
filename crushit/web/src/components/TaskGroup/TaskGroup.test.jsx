import { render } from '@redwoodjs/testing/web'

import TaskGroup from './TaskGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskGroup />)
    }).not.toThrow()
  })
})
