import React from 'react';
import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMedicine } from '../context/MedicineContext';
import { useNotification } from '../context/NotificationContext';
import TopNavigationBar from '../components/TopNavigationBar';
import stylesMedicineScreen from '../styles/styles-screen/StylesMedicineScreen';

const MedicineScreen = ({ navigation }: any) => {
  const { medicines, markMedicineAsDone, deleteMedicine } = useMedicine();
  const { markMedicineAsTaken } = useNotification();
  
  const activeMedicines = medicines.filter(medicine => medicine.isActive);
  const inactiveMedicines = medicines.filter(medicine => !medicine.isActive);

  const handleMarkAsDone = async (id: string, notificationId?: string) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to mark this medicine as done?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await markMedicineAsDone(id);
              if (notificationId) {
                await markMedicineAsTaken(id, notificationId);
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to update medicine status');
            }
          },
        },
      ]
    );
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this medicine?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMedicine(id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete medicine');
            }
          },
        },
      ]
    );
  };

  const renderMedicineBox = (medicine: any, isActive: boolean) => (
    <View key={medicine.id} style={stylesMedicineScreen.medicineBox}>
      {/* Checkmark for Completed Medicines */}
      {!isActive && (
        <View style={stylesMedicineScreen.checkmarkContainer}>
          <MaterialCommunityIcons name="check-circle" size={24} color="#177581" />
        </View>
      )}

      <View style={stylesMedicineScreen.medicineHeader}>
        <MaterialCommunityIcons name="pill" size={24} color="#177581" />
        <Text style={stylesMedicineScreen.medicineName}>{medicine.name}</Text>
      </View>

      <View style={stylesMedicineScreen.medicineDetails}>
        <Text style={stylesMedicineScreen.detailText}>
          Dosage: {medicine.dosage}
        </Text>
        <Text style={stylesMedicineScreen.detailText}>
          Mode of Intake: {medicine.intakeMode}
        </Text>
      </View>

      <View style={stylesMedicineScreen.actionButtons}>
        {isActive ? (
          <>
            <Pressable
              style={stylesMedicineScreen.checkButton}
              onPress={() => handleMarkAsDone(medicine.id, medicine.notificationId)}
            >
              <MaterialCommunityIcons name="check" size={24} color="#177581" />
            </Pressable>
            <Pressable
              style={stylesMedicineScreen.deleteButton}
              onPress={() => handleDelete(medicine.id)}
            >
              <MaterialCommunityIcons name="trash-can" size={24} color="rgb(190, 60, 51)" />
            </Pressable>
          </>
        ) : (
          <Pressable
            style={stylesMedicineScreen.deleteButton}
            onPress={() => handleDelete(medicine.id)}
          >
            <MaterialCommunityIcons name="trash-can" size={24} color="#177581" />
          </Pressable>
        )}
      </View>
    </View>

  );

  return (
    <View style={stylesMedicineScreen.container}>
      <View style={stylesMedicineScreen.header}>
        <Text style={stylesMedicineScreen.title}>Medicine Tracker</Text>
      </View>
      <ScrollView style={stylesMedicineScreen.scrollView}>
        <View style={stylesMedicineScreen.section}>
          <Text style={stylesMedicineScreen.sectionTitle}>Active Medicines</Text>
          {activeMedicines.length > 0 ? (
            activeMedicines.map(medicine => renderMedicineBox(medicine, true))
          ) : (
            <View style={stylesMedicineScreen.emptyState}>
              <Text style={stylesMedicineScreen.emptyStateText}>
                No active medicines
              </Text>
            </View>
          )}
        </View>

        <View style={stylesMedicineScreen.section}>
          <Text style={stylesMedicineScreen.sectionTitle}>Completed Medicines</Text>
          {inactiveMedicines.length > 0 ? (
            inactiveMedicines.map(medicine => renderMedicineBox(medicine, false))
          ) : (
            <View style={stylesMedicineScreen.emptyState}>
              <Text style={stylesMedicineScreen.emptyStateText}>
                No inactive medicines
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Pressable
        style={stylesMedicineScreen.addButton}
        onPress={() => navigation.navigate('AddMedicine')}
      >
        <Text style={stylesMedicineScreen.addButtonText}>Add Medicine</Text>
      </Pressable>
    </View>
  );
};

export default MedicineScreen; 