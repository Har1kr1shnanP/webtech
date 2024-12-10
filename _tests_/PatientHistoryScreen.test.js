import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import PatientHistoryScreen from '../screens/PatientHistoryScreen.js';

// Mock axios
jest.mock('axios');

describe('PatientHistoryScreen', () => {
  const mockRoute = {
    params: { patientId: '123' }
  };


  it('renders patient history after loading', async () => {
    const mockHistory = {
      patient: {
        name: 'Ashim Bista',
        age: 30,
        gender: 'Male',
        address: '46 Celeste Dr',
        phoneNumber: '444-2345'
      },
      tests: [
        { _id: '1', type: 'Blood Pressure', value: '130/80', date: '2024-10-23T00:00:00.000Z' }
      ]
    };

    axios.get.mockResolvedValueOnce({ data: mockHistory });

    const { getByText, queryByTestId } = render(<PatientHistoryScreen route={mockRoute} />);

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByText('Ashim Bista')).toBeTruthy();
      expect(getByText('30 years old • Male')).toBeTruthy();
      expect(getByText('46 Celeste Dr')).toBeTruthy();
      expect(getByText('444-2345')).toBeTruthy();
      expect(getByText('Blood Pressure')).toBeTruthy();
      expect(getByText('130/80')).toBeTruthy();
    });
  });
});