import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MedicineProvider } from './context/MedicineContext';
import AppNavigator from './navigation/AppNavigator';
import { SymptomProvider } from 'context/SymptomContext';
import { CalendarProvider } from 'context/CalendarContext';
import stylesGlobal from './styles/styles-screen/StylesGlobal';


export default function App() {
  return (
    <NavigationContainer>
      <MedicineProvider>
      <SymptomProvider>
      <CalendarProvider>
        <SafeAreaView style={stylesGlobal.safeAreaContainer}>
        <StatusBar
                barStyle="dark-content"
                backgroundColor="rgb(68, 171, 181)"
                translucent={true}
              />
          <AppNavigator />
        </SafeAreaView>
        </CalendarProvider>
      </SymptomProvider>
      </MedicineProvider>
    </NavigationContainer>
  );
}


