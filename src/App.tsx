import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native'
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
import { FileService } from './services/FileService';

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
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await FileService.initialize();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <WaterProvider>
          <MedicineProvider>
            <SymptomProvider>
              <ContactProvider>
                <CalendarProvider>
                  <AppContent />
                </CalendarProvider>
              </ContactProvider>
            </SymptomProvider>
          </MedicineProvider>
        </WaterProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
