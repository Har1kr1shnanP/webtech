import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

export default function PatientHistoryScreen({ route }) {
  const { patientId } = route.params;
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch patient history when component mounts
  useEffect(() => {
    fetchPatientHistory();
  }, []);

  // Function to fetch patient history from the API
  const fetchPatientHistory = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching patient history:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render individual test item
  const renderTestItem = ({ item }) => (
    <View style={styles.testItem}>
      <Text style={styles.testType}>{item.type}</Text>
      <Text style={styles.testValue}>{item.value}</Text>
      <Text style={styles.testDate}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {history && (
        <>
          {/* Patient information section */}
          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>{history.patient.name}</Text>
            <Text style={styles.patientDetails}>{history.patient.age} years old • {history.patient.gender}</Text>
            <Text style={styles.patientDetails}>{history.patient.address}</Text>
            <Text style={styles.patientDetails}>{history.patient.phoneNumber}</Text>
          </View>
          {/* Test history section */}
          <View style={styles.testsContainer}>
            <Text style={styles.testsTitle}>Test History</Text>
            <FlatList
              data={history.tests}
              renderItem={renderTestItem}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={<Text style={styles.noTests}>No tests available</Text>}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4d8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  patientInfo: {
    backgroundColor: '#8ecae6',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  patientDetails: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  testsContainer: {
    flex: 1,
    backgroundColor: '8ecae6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  testsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  testItem: {
    backgroundColor: '#F0F4F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  testType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  testValue: {
    fontSize: 16,
    color: '#666666',
  },
  testDate: {
    fontSize: 14,
    color: '#999999',
    marginTop: 5,
  },
  noTests: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginTop: 20,
  },
});