import { render } from '@redwoodjs/testing/web'

import ChangePassword from './ChangePassword'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChangePassword', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ChangePassword />)
    }).not.toThrow()
  })
})
