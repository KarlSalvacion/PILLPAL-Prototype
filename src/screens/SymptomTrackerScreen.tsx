import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useSymptoms } from '../context/SymptomContext';
import { allSymptoms } from '../data/SymptomsList';
import { Ionicons } from '@expo/vector-icons';
import TopNavigationBar from '../components/TopNavigationBar';

const SymptomTrackerScreen = ({ navigation }: any) => {
  const { selectedSymptoms, toggleSymptom } = useSymptoms();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderSymptomItem = (symptom: typeof allSymptoms[0]) => {
    const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
    
    return (
      <TouchableOpacity
        key={symptom.id}
        style={[
          styles.symptomItem,
          { backgroundColor: isSelected ? symptom.color : '#f5f5f5' }
        ]}
        onPress={() => toggleSymptom(symptom)}
      >
        <Text style={[styles.symptomText, { color: isSelected ? 'white' : 'black' }]}>
          {symptom.name}
        </Text>
        {isSelected && (
          <Text style={styles.treatmentText}>
            Treatment: {symptom.treatment}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TopNavigationBar 
        title="Symptom Tracker"
        navigation={navigation}
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => console.log('Notification pressed')}
        onContactPress={() => console.log('Contact pressed')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Symptom Tracker</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.symptomsList}>
        {allSymptoms.map(renderSymptomItem)}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Symptom</Text>
            {/* Add your symptom form here */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomsList: {
    flex: 1,
    padding: 16,
  },
  symptomItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  symptomText: {
    fontSize: 18,
    fontWeight: '500',
  },
  treatmentText: {
    marginTop: 8,
    fontSize: 14,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SymptomTrackerScreen; 