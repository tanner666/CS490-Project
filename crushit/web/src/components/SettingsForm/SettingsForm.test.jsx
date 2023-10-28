import { render } from '@redwoodjs/testing/web'

import Settings from './SettingsForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SettingsForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SettingsForm />)
    }).not.toThrow()
  })
})
