import { render } from '@redwoodjs/testing/web'

import ToDo from './ToDo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ToDo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ToDo />)
    }).not.toThrow()
  })
})
