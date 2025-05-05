import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import AddMedicineScreen from '../screens/AddMedicineScreen';
import ContactScreen from '../screens/ContactScreen';
import AddContactScreen from '../screens/AddContactScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';
import WaterTrackerScreen from '../screens/WaterTrackerScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen 
            name="AddMedicine" 
            component={AddMedicineScreen}
            options={{
              headerShown: false,
              title: 'Add Medicine',
              headerStyle: {
                backgroundColor: 'red',
              },
              headerTintColor: '#fff',
            }}
          />
          <Stack.Screen name="Contacts" component={ContactScreen} />
          <Stack.Screen name="AddContact" component={AddContactScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="WaterTracker" component={WaterTrackerScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator; 