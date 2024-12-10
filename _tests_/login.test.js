import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Login from '../screens/Login';

const mockNavigation = { navigate: jest.fn() };

describe('LoginScreen Component', () => {
  it('renders the login form correctly', () => {
    render(<Login navigation={mockNavigation} />);
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
  });

  it('displays an alert for invalid login credentials', () => {
    render(<Login navigation={mockNavigation} />);
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'wrongUser');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'wrongPass');
    fireEvent.press(screen.getByText('Sign in'));
    expect(global.alert).toHaveBeenCalledWith('Invalid login credentials');
  });

  it('navigates to the "Main" screen on successful login', () => {
    render(<Login navigation={mockNavigation} />);
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'test');
    fireEvent.press(screen.getByText('Sign in'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Main');
  });
});
