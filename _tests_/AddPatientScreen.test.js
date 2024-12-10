import React from 'react';
import { render } from '@testing-library/react-native';
import AddPatientScreen from '../screens/AddPatientScreen.js';

describe('AddPatientScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<AddPatientScreen navigation={{}} />);

    // Check if input fields and button are rendered
    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByPlaceholderText("Age")).toBeTruthy();
    expect(getByText('Add Patient')).toBeTruthy();
  });

  it('renders medical history input', () => {
    const { getByPlaceholderText } = render(<AddPatientScreen navigation={{}} />);

    // Check if medical history input is present
    expect(getByPlaceholderText('Medical History')).toBeTruthy();
  });
});