import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function PatientDetailsScreen({ route, navigation }) {
  const { patientId } = route.params;
  const [patient, setPatient] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}`);
      setPatient(response.data); // Sets the patient data including criticalCondition)
    } catch (error) {
      console.error('Error fetching patient details:', error);
      Alert.alert('Error', 'Failed to fetch patient details');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientTests = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:5000/api/patients/${patientId}/tests`);
      setTests(response.data);
    } catch (error) {
      //console.error('Error fetching patient tests:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to fetch patient tests');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPatientDetails();
      fetchPatientTests();
    }, [])
  );

  // Add this useEffect to handle refresh after adding a test
  useEffect(() => {
    if (route.params?.refresh) {
      fetchPatientDetails();
      fetchPatientTests();
      // Clear the refresh param
      navigation.setParams({ refresh: undefined });
    }
  }, [route.params?.refresh]);

  const renderTestItem = ({ item }) => (
    <View style={styles.testItem}>
      <Text style={styles.testType}>{item.type}</Text>
      <Text style={styles.testValue}>{item.value}</Text>
      <Text style={styles.testDate}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {patient && (
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{patient.name}</Text>
          <Text style={styles.patientDetails}>{patient.age} years old • {patient.gender}</Text>
          <Text style={styles.patientDetails}>{patient.address}</Text>
          <Text style={styles.patientDetails}>{patient.phoneNumber}</Text>
          {patient.criticalCondition && (
            <View style={styles.criticalIndicator}>
              <Ionicons name="warning" size={24} color="#FF3B30" />
              <Text style={styles.criticalText}>Critical Condition</Text>
            </View>
          )}
          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditPatient', { patientId })}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('deletePatient', { patientId })}
          >
            <Text style={styles.editButtonText}>Delete patient</Text>
          </TouchableOpacity>

        </View>
      )}
      <View style={styles.testsContainer}>
        <View style={styles.testsHeader}>
          <Text style={styles.testsTitle}>Recent Tests</Text>
          <TouchableOpacity
            style={styles.addTestButton}
            onPress={() => navigation.navigate('AddTest', { patientId })}
          >
            <Ionicons name="add-circle" size={24} color="#007AFF" />
            <Text style={styles.addTestText}>Add Test</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tests.slice(0, 5)}
          renderItem={renderTestItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={<Text style={styles.noTests}>No tests available</Text>}
        />
        <TouchableOpacity
          style={styles.viewHistoryButton}
          onPress={() => navigation.navigate('PatientHistory', { patientId })}
        >
          <Text style={styles.viewHistoryText}>View Full History</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4d8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b4d8',
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
  criticalIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  criticalText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  testsContainer: {
    flex: 1,
    backgroundColor: '#90e0ef',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  testsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  testsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  addTestButton: {
    fontSize:20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTestText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  viewHistoryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  viewHistoryText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});