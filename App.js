import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import all screen components
import WelcomeScreen from './screens/WelcomeScreen';
import PatientsListScreen from './screens/PatientsListScreen';
import AddPatientScreen from './screens/AddPatientScreen';
import PatientDetailsScreen from './screens/PatientDetailsScreen';
import AddTestScreen from './screens/AddTestScreen';
import EditPatientsScreen from './screens/EditPatientScreen';
import DeletePatientScreen from './screens/DeletePatientScreen';
import PatientHistoryScreen from './screens/PatientHistoryScreen';
import CriticalPatientsScreen from './screens/CriticalPatientsScreen';
import Login from './screens/Login';

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator component
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Configure tab bar icons
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'PatientsList') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'AddPatient') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'CriticalPatients') {
            iconName = focused ? 'warning' : 'warning-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="PatientsList" component={PatientsListScreen} options={{ title: 'Patients' }} />
      <Tab.Screen name="AddPatient" component={AddPatientScreen} options={{ title: 'Add Patient' }} />
      <Tab.Screen name="CriticalPatients" component={CriticalPatientsScreen} options={{ title: 'Critical' }} />
    </Tab.Navigator>
  );
}

// Main App component
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* Define all screens in the stack */}
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PatientDetails" component={PatientDetailsScreen} options={{ title: 'Patient Details' }} />
          <Stack.Screen name="AddTest" component={AddTestScreen} options={{ title: 'Add Test' }} />
          <Stack.Screen name="EditPatient" component={EditPatientsScreen} options={{title: 'Edit patient'}} />
          <Stack.Screen name="deletePatient" component={DeletePatientScreen} options={{title: 'delete patient'}} />
          {/* <Stack.Screen name="PatientsList" component={PatientsListScreen} options={{title: 'Patient List'}} /> */}
          <Stack.Screen name="PatientHistory" component={PatientHistoryScreen} options={{ title: 'Patient History' }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}