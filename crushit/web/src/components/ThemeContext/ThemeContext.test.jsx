import React from 'react';
import { render, fireEvent, screen } from '@redwoodjs/testing/web';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './ThemeContext';

describe('ThemeProvider', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('useTheme Hook', () => {
  it('toggles theme from light to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/toggle theme/i));
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument();
  });
});
