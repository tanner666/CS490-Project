import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameField from './NameField';
import { ThemeProvider } from '../ThemeContext/ThemeContext';

describe('NameField Component', () => {
  const mockHandleFirstNameChange = jest.fn((e) => e.target.value);
  const mockHandleLastNameChange = jest.fn();

  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <NameField
          firstName={'bob'}
          lastName={'walters'}
          handleFirstNameChange={mockHandleFirstNameChange}
          handleLastNameChange={mockHandleLastNameChange}
          theme="light"
        />
      </ThemeProvider>
    );

    //expect(screen.getByLabelText(/Podomoro/i)).toBeInTheDocument();
    //expect(screen.getByLabelText(/Short Break/i)).toBeInTheDocument();
    //expect(screen.getByLabelText(/Long Break/i)).toBeInTheDocument();
  });

});

