import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { MedicineProvider } from './context/MedicineContext';
import { WaterProvider } from './context/WaterContext';
import { NotificationProvider } from './context/NotificationContext';
import { SymptomProvider } from './context/SymptomContext';
import { CalendarProvider } from './context/CalendarContext';
import { ContactProvider } from './context/ContactContext';
import stylesGlobal from './styles/styles-screen/StylesGlobal';
import AppNavigator from './navigation/AppNavigator';

// ✅ Initialize Firebase (IMPORTANT)
import './config/firebase'; // Keep this import to initialize Firebase

const AppContent = () => {
  return (
    <SafeAreaView style={stylesGlobal.safeAreaContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="rgb(68, 171, 181)"
        translucent={true}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App = () => {
  // ⛔️ Removed FileService initialization
  return (
    <AuthProvider>
      <ContactProvider>
        <NotificationProvider>
          <MedicineProvider>
            <WaterProvider>
              <SymptomProvider>
                <CalendarProvider>
                  <AppContent />
                </CalendarProvider>
              </SymptomProvider>
            </WaterProvider>
          </MedicineProvider>
        </NotificationProvider>
      </ContactProvider>
    </AuthProvider>
  );
};

export default App;
