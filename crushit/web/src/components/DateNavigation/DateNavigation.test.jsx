// web/src/components/DateNavigation/DateNavigation.test.jsx

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
  });

  it('checks the presence of images', () => {
    render(<DateNavigation />);
    
    // Check if the images are present.
    expect(screen.getByAltText('Previous Month')).toBeInTheDocument();
    expect(screen.getByAltText('Next Month')).toBeInTheDocument();
    expect(screen.getByAltText('Previous Day')).toBeInTheDocument();
    expect(screen.getByAltText('Next Day')).toBeInTheDocument();
    expect(screen.getByAltText('Previous Year')).toBeInTheDocument();
    expect(screen.getByAltText('Next Year')).toBeInTheDocument();
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

  it('checks the functionality of previous and next buttons for month, day, and year', () => {
    render(<DateNavigation />);
    
    // Simulate user interaction with previous and next buttons
    fireEvent.click(screen.getByAltText('Previous Month'));
    fireEvent.click(screen.getByAltText('Next Month'));
    fireEvent.click(screen.getByAltText('Previous Day'));
    fireEvent.click(screen.getByAltText('Next Day'));
    fireEvent.click(screen.getByAltText('Previous Year'));
    fireEvent.click(screen.getByAltText('Next Year'));

    // Check if the state values are updated correctly
    // Add your assertions here based on the expected state changes

    // Example assertions for month
    expect(screen.getByTestId('monthDropdown').value).toBe('11'); // Updated value after clicking next or previous

    // Example assertions for year
    expect(screen.getByTestId('yearDropdown').value).toBe('2023'); // Updated value after clicking next or previous
  });

  it('checks the functionality of month dropdown', () => {
    render(<DateNavigation />);
    
    const monthDropdown = screen.getByTestId('monthDropdown');

    // Simulate user selecting a month
    fireEvent.change(monthDropdown, { target: { value: '5' } });

    // Check if the state value is updated correctly
    expect(screen.getByTestId('monthDropdown').value).toBe('5');
  });

  it('checks the functionality of day dropdown', () => {
    render(<DateNavigation />);
    
    const dayDropdown = screen.getByTestId('dayDropdown');

    // Simulate user selecting a day
    fireEvent.change(dayDropdown, { target: { value: '20' } });

    // Check if the state value is updated correctly
    expect(screen.getByTestId('dayDropdown').value).toBe('20');
  });

  it('checks the functionality of year dropdown', () => {
    render(<DateNavigation />);
    
    const yearDropdown = screen.getByTestId('yearDropdown');

    // Simulate user selecting a year
    fireEvent.change(yearDropdown, { target: { value: '2023' } });

    // Check if the state value is updated correctly
    expect(screen.getByTestId('yearDropdown').value).toBe('2023');
  });
});


