// Import the necessary modules
import { fetch } from 'cross-undici-fetch';
import { getAuthorizationURL } from './createAuth'; // Update with the correct path

// Mock the cross-undici-fetch module
jest.mock('cross-undici-fetch', () => ({
  fetch: jest.fn(),
}));

describe('getAuthorizationURL', () => {
  it('should return authorization URL', async () => {
    // Mocked response for the fetch call
    const mockedResponse = {
      json: jest.fn().mockResolvedValue({ data: 'http://example.com/auth' }),
    };

    // Configure fetch mock to use mocked response
    fetch.mockResolvedValue(mockedResponse);

    // Call the function
    const result = await getAuthorizationURL();

    // Assertions to verify the behavior
    expect(fetch).toHaveBeenCalledWith('http://localhost:8911/createAuth');
    expect(mockedResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ url: 'http://example.com/auth' });
  });
});
