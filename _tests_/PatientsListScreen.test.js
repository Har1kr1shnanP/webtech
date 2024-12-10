import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import PatientsListScreen from '../screens/PatientsListScreen';
import axios from 'axios';

jest.mock('axios');

const mockNavigation = {
  navigate: jest.fn(),
};

describe('PatientsListScreen', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { _id: '1', name: 'Patient Name', age: 30, gender: 'Male', criticalCondition: false },
        { _id: '2', name: 'Another Patient', age: 40, gender: 'Female', criticalCondition: true },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', async () => {
    const { toJSON } = render(
      <NavigationContainer>
        <PatientsListScreen navigation={{ navigate: jest.fn() }} />
      </NavigationContainer>
    );

    expect(toJSON()).toMatchSnapshot();
  });


  it('renders correctly', async () => {
    const { findByPlaceholderText, findAllByText } = render(
      <NavigationContainer>
        <PatientsListScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Check that the search input is rendered
    const searchInput = await findByPlaceholderText('Search patients...');
    expect(searchInput).toBeTruthy();

    // Check that the patient names are rendered
    const patients = await findAllByText(/Patient Name|Another Patient/);
    expect(patients.length).toBe(2);
  });

  it('navigates to patient details on item press', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <PatientsListScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    // Wait for the data to load and find the patient item
    const patientItem = await findByText('Patient Name');
    expect(patientItem).toBeTruthy();

    // Simulate a press on the patient item
    fireEvent.press(patientItem);

    // Assert navigation was triggered with correct parameters
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PatientDetails', {
      patientId: '1',
    });
  });
});
