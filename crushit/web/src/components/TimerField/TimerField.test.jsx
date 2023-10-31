import { render } from '@redwoodjs/testing/web'

import TimerField from './TimerField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TimerField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimerField />)
    }).not.toThrow()
  })
})
