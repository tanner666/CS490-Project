import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('requireAuth has stub implementation. Should not throw when current user', () => {
    // Mock context with a currentUser object
    const mockContext = {
      currentUser: {
        id: 1,
        email: "user@example.com",
        // Add other necessary fields
      },
    };
  
    // Use the mock context in your test
    const mockExecution = mockRedwoodDirective(requireAuth, { context: mockContext });
  
    expect(mockExecution).not.toThrowError();
  });
})
