import { render } from '@redwoodjs/testing/web'

import RegistrationPage from './RegistrationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RegistrationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RegistrationPage />)
    }).not.toThrow()
  })
})
