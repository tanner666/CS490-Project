import { render } from '@redwoodjs/testing/web'

import ResetpasswordPage from './ResetpasswordPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ResetpasswordPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResetpasswordPage />)
    }).not.toThrow()
  })
})
