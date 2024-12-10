import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function AddPatientScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [isPatientAdded, setIsPatientAdded] = useState(false); // Track if patient is added

  // useEffect to handle navigation or other actions after patient is added
  useEffect(() => {
    if (isPatientAdded) {
      Alert.alert('Success', 'Patient added successfully');
      navigation.navigate('PatientsList'); // Navigate to PatientsList after addition
    }
  }, [isPatientAdded, navigation]); // Dependency on `isPatientAdded` and `navigation`

  // Function to handle adding a new patient
  const handleAddPatient = async () => {
    if (!name || !age || !gender) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Validate phone number length
    const phoneRegex = /^\d{10}$/; // Regular expression for 10-digit numbers
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      await axios.post('http://10.0.2.2:5000/api/patients', {
        name,
        age: parseInt(age),
        gender,
        address,
        phoneNumber,
        medicalHistory: medicalHistory.split(',').map(item => item.trim()),
      });

      // Clear the form fields after successful submission
    setName('');
    setAge('');
    setGender('');
    setAddress('');
    setPhoneNumber('');
    setMedicalHistory('');

      // Set state to trigger useEffect
      setIsPatientAdded(true);
    } catch (error) {
      console.error('Error adding patient:', error);
      Alert.alert('Error', 'Failed to add patient');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
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
        {/* Medical history input */}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Medical History"
          value={medicalHistory}
          onChangeText={setMedicalHistory}
          multiline
        />
        {/* Add patient button */}
        <TouchableOpacity style={styles.button} onPress={handleAddPatient}>
          <Text style={styles.buttonText}>Add Patient</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
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
