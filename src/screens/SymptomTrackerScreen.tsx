import React, { useState } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSymptoms } from '../context/SymptomContext';
import AddSymptomModal from '../components/AddSymptomModal';
import stylesSymptomTracker from '../styles/styles-screen/StylesSymptomTracker';

const SymptomTrackerScreen = ({ navigation }: any) => {
  const { trackedSymptoms, addSymptoms, removeSymptom, toggleSymptom } = useSymptoms();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const activeSymptoms = trackedSymptoms.filter(symptom => !symptom.isChecked);
  const resolvedSymptoms = trackedSymptoms.filter(symptom => symptom.isChecked);

  const handleAddSymptoms = async (selectedSymptoms: string[]) => {
    await addSymptoms(selectedSymptoms);
  };

  const handleDeleteSymptom = (id: string) => {
    Alert.alert(
      'Delete Symptom',
      'Are you sure you want to delete this symptom?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeSymptom(id),
        },
      ],
    );
  };

  const handleToggleSymptom = (id: string) => {
    Alert.alert(
      'Mark as Resolved',
      'Do you want to mark this symptom as resolved?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => toggleSymptom(id),
        },
      ],
    );
  };

  const renderSymptomItem = (symptom: any, isResolved: boolean) => (
    <View key={symptom.id} style={stylesSymptomTracker.symptomItem}>
      <View style={stylesSymptomTracker.symptomHeader}>
        <MaterialCommunityIcons name="alert-circle" size={24} color="#177581" />
        <Text style={stylesSymptomTracker.symptomName}>{symptom.name}</Text>
      </View>
      
      <View style={stylesSymptomTracker.symptomDetails}>
        {symptom.treatment && (
          <Text style={stylesSymptomTracker.detailText}>
            Treatment: {symptom.treatment}
          </Text>
        )}
      </View>

      <View style={stylesSymptomTracker.actionButtons}>
        {!isResolved ? (
          <>
            <Pressable
              style={stylesSymptomTracker.checkButton}
              onPress={() => handleToggleSymptom(symptom.id)}
            >
              <MaterialCommunityIcons name="check" size={24} color="#177581" />
            </Pressable>
            <Pressable
              style={stylesSymptomTracker.deleteButton}
              onPress={() => handleDeleteSymptom(symptom.id)}
            >
              <MaterialCommunityIcons name="trash-can" size={24} color="#177581" />
            </Pressable>
          </>
        ) : (
          <Pressable
            style={stylesSymptomTracker.deleteButton}
            onPress={() => handleDeleteSymptom(symptom.id)}
          >
            <MaterialCommunityIcons name="trash-can" size={24} color="#177581" />
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View style={stylesSymptomTracker.container}>
      <View style={stylesSymptomTracker.header}>
        <Text style={stylesSymptomTracker.title}>Symptom Tracker</Text>
      </View>

      <ScrollView style={stylesSymptomTracker.scrollView}>
        <View style={stylesSymptomTracker.section}>
          <Text style={stylesSymptomTracker.sectionTitle}>Active Symptoms</Text>
          {activeSymptoms.length > 0 ? (
            activeSymptoms.map(symptom => renderSymptomItem(symptom, false))
          ) : (
            <View style={stylesSymptomTracker.emptyState}>
              <Text style={stylesSymptomTracker.emptyStateText}>
                No active symptoms
              </Text>
            </View>
          )}
        </View>

        <View style={stylesSymptomTracker.section}>
          <Text style={stylesSymptomTracker.sectionTitle}>Resolved Symptoms</Text>
          {resolvedSymptoms.length > 0 ? (
            resolvedSymptoms.map(symptom => renderSymptomItem(symptom, true))
          ) : (
            <View style={stylesSymptomTracker.emptyState}>
              <Text style={stylesSymptomTracker.emptyStateText}>
                No resolved symptoms
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Pressable
        style={stylesSymptomTracker.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
      </Pressable>

      <AddSymptomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddSymptoms}
      />
    </View>
  );
};

export default SymptomTrackerScreen; 