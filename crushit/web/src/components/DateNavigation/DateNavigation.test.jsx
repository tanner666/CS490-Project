//web/src/components/DateNavigation/DateNavigation.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DateNavigation from './DateNavigation';

jest.mock('../ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'yourMockedTheme' })),
}));

// Mocking the RedwoodJS navigate function
jest.mock('@redwoodjs/router', () => ({
  navigate: jest.fn(),
}));

describe('DateNavigation', () => {
  it('renders successfully', () => {
    render(<DateNavigation />);
    // Your assertions for rendering go here
  });

  it('checks the presence of images', () => {
    render(<DateNavigation />);
    // Your assertions for images go here
  });

  it('checks the presence of dropdown boxes', () => {
    render(<DateNavigation />);

    // Find the select elements directly
    const monthDropdown = screen.getByTestId('monthDropdown');
    const dayDropdown = screen.getByTestId('dayDropdown');
    const yearDropdown = screen.getByTestId('yearDropdown');

    expect(monthDropdown).toBeInTheDocument();
    expect(dayDropdown).toBeInTheDocument();
    expect(yearDropdown).toBeInTheDocument();
  });

  it('checks the functionality of month dropdown', () => {
    render(<DateNavigation />);
    const monthDropdown = screen.getByTestId('monthDropdown');

    // Simulate a change in the month dropdown
    fireEvent.change(monthDropdown, { target: { value: '6' } });

    // Your assertions for the functionality go here
  });

  it('checks the functionality of day dropdown', () => {
    render(<DateNavigation />);
    const dayDropdown = screen.getByTestId('dayDropdown');

    // Simulate a change in the day dropdown
    fireEvent.change(dayDropdown, { target: { value: '15' } });

    // Your assertions for the functionality go here
  });

  it('checks the functionality of year dropdown', () => {
    render(<DateNavigation />);
    const yearDropdown = screen.getByTestId('yearDropdown');

    // Simulate a change in the year dropdown
    fireEvent.change(yearDropdown, { target: { value: '2025' } });

    // Your assertions for the functionality go here
  });
});


