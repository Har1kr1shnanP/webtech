import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function PatientsListScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      //console.error('Error fetching patients:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPatients();
    }, [])
  );

  // useEffect(() => {
  //   navigation.setOptions({
  //     tabBarStyle: { display: 'flex' },
  //   });
  // }, [navigation]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPatientItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => navigation.navigate('PatientDetails', { patientId: item._id })}
    >
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDetails}>{item.age} years old • {item.gender}</Text>
        {item.criticalCondition && (
          <Ionicons name="warning" size={24} color="#FF3B30" />
        )}
      </View>
      <Ionicons name="chevron-forward" size={24} color="#007AFF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search patients..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPatients}
        renderItem={renderPatientItem}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4d8',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#48cae4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  patientDetails: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
});