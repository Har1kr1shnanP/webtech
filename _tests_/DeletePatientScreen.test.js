import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import DeletePatientScreen from '../screens/DeletePatientScreen';

// Mock axios
jest.mock('axios');

// Mock the navigation prop
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock route params
const mockRoute = {
  params: { patientId: '123' },
};

describe('DeletePatientScreen', () => {
  it('renders correctly and fetches patient details', async () => {
    // Mock the API response for fetching patient details
    axios.get.mockResolvedValueOnce({
      data: {
        name: 'John Doe',
        age: 30,
        gender: 'male',
        address: '123 Main St',
        phoneNumber: '555-1234',
      },
    });

    const { getByText, getByTestId } = render(
      <DeletePatientScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Wait for the patient details to load and verify the details
    await waitFor(() => {
      expect(getByText('Name: John Doe')).toBeTruthy();
      expect(getByText('Age: 30')).toBeTruthy();
      expect(getByText('Gender: male')).toBeTruthy();
      expect(getByText('Address: 123 Main St')).toBeTruthy();
      expect(getByText('Phone: 555-1234')).toBeTruthy();
    });

    // Ensure the delete button appears after data is fetched
    expect(getByTestId('deleteButton')).toBeTruthy();
  });

  it('deletes the patient and navigates back', async () => {
    // Mock the API response for deletion
    axios.delete.mockResolvedValueOnce({});

    const { getByTestId } = render(
      <DeletePatientScreen route={mockRoute} navigation={mockNavigation} />
    );

    // Wait for the delete button to be rendered after patient details are loaded
    await waitFor(() => {
      console.log('Checking for delete button...');
      expect(getByTestId('deleteButton')).toBeTruthy();
    });

    // Simulate pressing the delete button
    fireEvent.press(getByTestId('deleteButton'));

    // Wait for the deletion to complete and navigation to occur
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        'http://10.0.2.2:5000/api/patients/123'
      );
      expect(mockNavigation.navigate).toHaveBeenCalledWith('PatientsList');
    });
  });
});
