import { render } from '@redwoodjs/testing/web'

import PlanDay from './PlanDay'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PlanDay', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PlanDay />)
    }).not.toThrow()
  })
})
