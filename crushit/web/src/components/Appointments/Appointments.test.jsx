import { render } from '@redwoodjs/testing/web'

import Appointments from './Appointments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Appointments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Appointments />)
    }).not.toThrow()
  })
})
