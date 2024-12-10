import React, { useState, useEffect,useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function CriticalPatientsScreen({ navigation }) {
  // State variable to store the list of critical patients
  const [criticalPatients, setCriticalPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch critical patients when the component mounts
  useEffect(() => {
    fetchCriticalPatients();
  }, []);

  // Function to fetch critical patients from the API
  const fetchCriticalPatients = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:5000/api/patients/critical');
      setCriticalPatients(response.data);
    } catch (error) {
      console.error('Error fetching critical patients:', error);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCriticalPatients();
    setRefreshing(false);
  };
 

  // Render a single patient item in the list
  const renderPatientItem = ({ item }) => (
    <TouchableOpacity
      style={styles.patientItem}
      onPress={() => navigation.navigate('PatientDetails', { patientId: item._id })}
    >
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.patientDetails}>{item.age} years old • {item.gender}</Text>
      </View>
      <Ionicons name="warning" size={24} color="#FF3B30" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={criticalPatients}
        renderItem={renderPatientItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={<Text style={styles.noPatients}>No critical patients</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48cae4',
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffa5ab',
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
});