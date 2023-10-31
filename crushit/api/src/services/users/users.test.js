import { createUser } from './users'
import { db } from 'src/lib/db'

// Mock db module
jest.mock('src/lib/db', () => ({
  db: {
    user: {
      create: jest.fn(),
    },
    // ...other mocks if needed
  },
}))

describe('createUser', () => {
  // Define a sample input
  const sampleInput = {
    email: 'test@example.com',
    firebaseUid: '123456',
  }

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('creates a new user successfully', async () => {
    // Set up our mock to successfully create a user
    db.user.create.mockResolvedValue({
      email: sampleInput.email,
      firebaseUid: sampleInput.firebaseUid,
      username: sampleInput.email,
      name: '',
    })

    const result = await createUser({ input: sampleInput })

    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        email: sampleInput.email,
        firebaseUid: sampleInput.firebaseUid,
        username: sampleInput.email,
        name: '',
      },
    })
    expect(result).toBeDefined()
    expect(result.email).toBe(sampleInput.email)
    expect(result.firebaseUid).toBe(sampleInput.firebaseUid)
  })

  it('throws an error if user creation fails', async () => {
    // Mock the `create` function to throw an error
    const errorMessage = 'Failed to create user'
    db.user.create.mockRejectedValue(new Error(errorMessage))

    // Assert that the createUser function throws an error
    await expect(createUser({ input: sampleInput })).rejects.toThrow(errorMessage)
  })
})
