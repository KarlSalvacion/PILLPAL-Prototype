import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import TopNavigationBar from '../components/TopNavigationBar';
import stylesMedicineScreen from 'styles/styles-screen/StylesMedicineScreen';

const MedicineScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <TopNavigationBar 
        title="Medicine"
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => console.log('Notification pressed')}
        onContactPress={() => console.log('Contact pressed')}
      />
      <Text style={styles.text}>Medicine Screen</Text>

      <Pressable
          style={stylesMedicineScreen.addButton}
          onPress={() => navigation.navigate('AddMedicine')}
        >
          <Text style={stylesMedicineScreen.addButtonText}>Add Medicine</Text>
    </Pressable>
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

export default MedicineScreen; 