import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function EditPatientScreen({ route, navigation }) {
  const { patientId } = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}`);
      const patient = response.data;
      setName(patient.name);
      setAge(patient.age.toString());
      setGender(patient.gender);
      setAddress(patient.address);
      setPhoneNumber(patient.phoneNumber);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleUpdatePatient = async () => {
    try {
      await axios.put(`http://10.0.2.2:5000/api/patients/${patientId}`, {
        name,
        age: parseInt(age),
        gender,
        address,
        phoneNumber
      });
      Alert.alert('Success', 'Patient details updated successfully');
      navigation.goBack(); // Go back to PatientDetailsScreen
    } catch (error) {
      console.error('Error updating patient details:', error);
      Alert.alert('Error', 'Failed to update patient details');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdatePatient}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#48cae4',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
