import { render } from '@redwoodjs/testing/web'

import FocusTime from './FocusTime'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FocusTime', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FocusTime />)
    }).not.toThrow()
  })
})
