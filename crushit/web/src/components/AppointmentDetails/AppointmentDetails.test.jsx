import { render } from '@redwoodjs/testing/web'

import AppointmentDetails from './AppointmentDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppointmentDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppointmentDetails />)
    }).not.toThrow()
  })
})
