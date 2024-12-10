import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function DeletePatientScreen({ route, navigation }) {
  const { patientId } = route.params; // Get the patient ID from route params
  const [patient, setPatient] = useState(null);

  // Fetch patient details to show them before deletion
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}`);
        setPatient(response.data);
      } catch (error) {
       // console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  // Function to handle patient deletion
  const handleDeletePatient = async () => {
    try {
      await axios.delete(`http://10.0.2.2:5000/api/patients/${patientId}`);
      Alert.alert('Success', 'Patient deleted successfully');
      navigation.navigate('Main', { screen: 'PatientsList' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      Alert.alert('Error', 'Failed to delete patient');
    }
  };

  // Function to show confirmation alert before deleting
  const confirmDelete = () => {
    Alert.alert(
      'Delete Patient',
      `Are you sure you want to delete the patient: ${patient?.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: handleDeletePatient,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {patient ? (
        <>
          <Text style={styles.title}>Delete Patient</Text>
          <View style={styles.patientDetails}>
            <Text style={styles.text}>Name: {patient.name}</Text>
            <Text style={styles.text}>Age: {patient.age}</Text>
            <Text style={styles.text}>Gender: {patient.gender}</Text>
            <Text style={styles.text}>Address: {patient.address}</Text>
            <Text style={styles.text}>Phone: {patient.phoneNumber}</Text>
          </View>
          <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={confirmDelete}
          testID="deleteButton"
          >
          <Text style={styles.buttonText}>Delete Patient</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.text}>Loading patient details...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  patientDetails: {
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4c4c',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
