import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavigationBar from '../components/TopNavigationBar';

const WaterTrackerScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TopNavigationBar 
        title="Water Tracker"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => console.log('Notification pressed')}
        onContactPress={() => console.log('Contact pressed')}
      />
      <Text style={styles.text}>Water Tracker Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default WaterTrackerScreen; 