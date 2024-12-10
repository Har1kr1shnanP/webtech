import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import PatientDetailsScreen from '../screens/PatientDetailsScreen';

// Mock axios
jest.mock('axios');

describe('PatientDetailsScreen', () => {
  const mockRoute = {
    params: { patientId: '123' },
  };
  

  it('renders patient details after loading', async () => {
    const mockPatientDetails = {
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      address: '123 Main St',
      phoneNumber: '555-1234',
      
    };

    // Mock the axios GET request to resolve with mockPatientDetails
    axios.get.mockResolvedValueOnce({ data: mockPatientDetails });

    // Render the PatientDetailsScreen component wrapped in a NavigationContainer
    const { getByText, queryByTestId } = render(
      <NavigationContainer>
        <PatientDetailsScreen route={mockRoute} />
      </NavigationContainer>
    );

    // Wait for the component to load and check for the rendered content
    await waitFor(() => {
      // Ensure the loading indicator is gone
      expect(queryByTestId('loading-indicator')).toBeNull();
      
      // Check for the patient details rendered on the screen
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('30 years old • Male')).toBeTruthy();
      expect(getByText('123 Main St')).toBeTruthy();
      expect(getByText('555-1234')).toBeTruthy();
      
      
    });
  });
});