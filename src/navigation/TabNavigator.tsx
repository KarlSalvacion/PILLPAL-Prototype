import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MedicineScreen from '../screens/MedicineScreen';
import SymptomTrackerScreen from '../screens/SymptomTrackerScreen';
import WaterTrackerScreen from '../screens/WaterTrackerScreen';
import { TabParamList } from './types';
import stylesTabNavigator from '../styles/styles-navigation/StylesTabNavigator';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          ...stylesTabNavigator.tabBarStyle,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Medicine') {
            iconName = focused ? 'pill' : 'pill';
          } else if (route.name === 'Symptoms') {
            iconName = focused ? 'file-document' : 'file-document';
          } else if (route.name === 'Water') {
            iconName = focused ? 'water' : 'water-outline';
          } else {
            iconName = 'home';
          }

          return (
            <View style={[stylesTabNavigator.tabBarItemStyle, focused && stylesTabNavigator.activeTab]}>
              <MaterialCommunityIcons 
                name={iconName} 
                size={24} 
                color={focused ? '#fff' : 'gray'} 
              />
              <Text style={[stylesTabNavigator.tabLabel, focused && stylesTabNavigator.activeLabel]}>
                {route.name}
              </Text>
            </View>
          );
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Medicine" component={MedicineScreen} />
      <Tab.Screen name="Symptoms" component={SymptomTrackerScreen} />
      <Tab.Screen name="Water" component={WaterTrackerScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator; 