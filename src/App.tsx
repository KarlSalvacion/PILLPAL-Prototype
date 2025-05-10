import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { CalendarProvider } from "./context/CalendarContext";
import { ContactProvider } from "./context/ContactContext";
import { MedicineProvider } from "./context/MedicineContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SymptomProvider } from "./context/SymptomContext";
import { WaterProvider } from "./context/WaterContext";
import AppNavigator from "./navigation/AppNavigator";
import { FileService } from "./services/FileService";
import stylesGlobal from "./styles/styles-screen/StylesGlobal";

const AppContent = () => {
  return (
    <SafeAreaView style={stylesGlobal.safeAreaContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
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
        console.error("Error initializing app:", error);
      }
    };

    initializeApp();
  }, []);

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
