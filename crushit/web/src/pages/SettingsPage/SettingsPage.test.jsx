import { render, screen, waitFor } from '@redwoodjs/testing/web'
import { ThemeProvider } from 'src/components/ThemeContext/ThemeContext'
import SettingsPage from './SettingsPage'
import { getUserUid } from 'src/auth'

// Mock the `getUserUid` function
jest.mock('src/auth', () => ({
  getUserUid: jest.fn(),
  useAuth: jest.fn(() => ({ isAuthenticated: true, currentUser: { uid: 'user-id' } })),
}))

describe('SettingsPage', () => {
  it('renders successfully and displays UID after loading', async () => {
    // Mock getUserUid to resolve with a test UID
    getUserUid.mockResolvedValueOnce('test-uid');

    // Render the SettingsPage
    render(
      <ThemeProvider>
        <SettingsPage />
      </ThemeProvider>
    );

    // Initially, the loading message should be displayed
    expect(screen.getByText('Loading or no UID available...')).toBeInTheDocument();

    // Wait for the UID to be loaded and check for the presence of the SettingsForm
    await waitFor(() => {
      expect(screen.queryByText('Loading or no UID available...')).not.toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument(); // Assuming 'Settings' text is in your SettingsForm
    });
  });

  // Add more tests as needed for other functionalities or edge cases
});
