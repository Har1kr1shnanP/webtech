import React from 'react';
import { render } from '@testing-library/react-native';
import AddTestScreen from '../screens/AddTestScreen'; // Adjust the path to your component

describe('AddTestScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AddTestScreen route={{ params: { patientId: '12345' } }} navigation={{ goBack: jest.fn() }} />
    );

    // Check if Picker is rendered
    expect(getByTestId('test-picker')).toBeTruthy();

    // Check if input field and button are rendered
    expect(getByPlaceholderText('Test Value')).toBeTruthy();
    expect(getByText('Add Test')).toBeTruthy();
  });
});