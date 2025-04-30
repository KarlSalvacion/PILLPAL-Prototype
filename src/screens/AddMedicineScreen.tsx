import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMedicine } from '../context/MedicineContext';
import DosageUnitPicker from '../components/DosageUnitPicker';
import IntakeModePicker from '../components/IntakeModePicker';
import stylesAddMedicine from '../styles/styles-screen/StylesAddMedicine';

const AddMedicineScreen = ({ navigation }: any) => {
  const { addMedicine } = useMedicine();
  const [medicineName, setMedicineName] = useState('');
  const [dosageAmount, setDosageAmount] = useState('');
  const [dosageUnit, setDosageUnit] = useState('mg');
  const [intakeMode, setIntakeMode] = useState('oral');
  const [isDosageUnitModalVisible, setDosageUnitModalVisible] = useState(false);
  const [isIntakeModeModalVisible, setIntakeModeModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const calculateNextReminder = (time: Date) => {
    const now = new Date();
    const selected = new Date(time);
    
    // Set the selected time to today's date
    selected.setFullYear(now.getFullYear());
    selected.setMonth(now.getMonth());
    selected.setDate(now.getDate());
    
    // If the selected time is in the past, set it to tomorrow
    if (selected < now) {
      selected.setDate(selected.getDate() + 1);
    }
    
    return selected.toISOString();
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSelectedTime(selectedDate);
    }
  };

  const handleTimeSave = () => {
    setShowTimePicker(false);
  };

  const handleAddMedicine = () => {
    if (!medicineName || !dosageAmount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Confirm',
      'Are you sure you want to add this medicine?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: async () => {
            try {
              const nextReminder = calculateNextReminder(selectedTime);
              const newMedicine = {
                name: medicineName,
                dosage: `${dosageAmount} ${dosageUnit}`,
                intakeMode: intakeMode,
                intakeTime: selectedTime.toISOString(),
                nextReminder: nextReminder,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };

              await addMedicine(newMedicine);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to add medicine. Please try again.');
            }
          },
        },
      ]
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <ScrollView style={stylesAddMedicine.container}>
      <Text style={stylesAddMedicine.title}>Add New Medicine</Text>

      <View style={stylesAddMedicine.inputGroup}>
        <Text style={stylesAddMedicine.label}>Medicine Name</Text>
        <TextInput
          style={stylesAddMedicine.input}
          placeholder="Enter medicine name"
          value={medicineName}
          onChangeText={setMedicineName}
        />
      </View>

      <View style={stylesAddMedicine.inputGroup}>
        <Text style={stylesAddMedicine.label}>Dosage</Text>
        <View style={stylesAddMedicine.dosageInputContainer}>
          <TextInput
            style={[stylesAddMedicine.input, stylesAddMedicine.dosageInput]}
            placeholder="Amount"
            keyboardType="numeric"
            value={dosageAmount}
            onChangeText={setDosageAmount}
          />
          <Pressable
            style={stylesAddMedicine.unitButton}
            onPress={() => setDosageUnitModalVisible(true)}
          >
            <Text style={stylesAddMedicine.unitButtonText}>{dosageUnit}</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#177581" />
          </Pressable>
        </View>
      </View>

      <View style={stylesAddMedicine.inputGroup}>
        <Text style={stylesAddMedicine.label}>Mode of Intake</Text>
        <Pressable
          style={stylesAddMedicine.intakeModeButton}
          onPress={() => setIntakeModeModalVisible(true)}
        >
          <Text style={stylesAddMedicine.intakeModeButtonText}>{intakeMode}</Text>
          <MaterialCommunityIcons name="chevron-down" size={20} color="#177581" />
        </Pressable>
      </View>

      <View style={stylesAddMedicine.inputGroup}>
        <Text style={stylesAddMedicine.label}>Reminder Time</Text>
        <Pressable
          style={stylesAddMedicine.input}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={stylesAddMedicine.timeInputContainer}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#177581" />
            <Text style={stylesAddMedicine.timeInputText}>{formatTime(selectedTime)}</Text>
          </View>
        </Pressable>
        {showTimePicker && (
          <View style={stylesAddMedicine.timePickerContainer}>
            <DateTimePicker
              value={selectedTime}
              mode="time"
              is24Hour={false}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
            <Pressable
              style={stylesAddMedicine.timeSaveButton}
              onPress={handleTimeSave}
            >
              <Text style={stylesAddMedicine.timeSaveButtonText}>Save Time</Text>
            </Pressable>
          </View>
        )}
      </View>

      <Pressable style={stylesAddMedicine.button} onPress={handleAddMedicine}>
        <Text style={stylesAddMedicine.buttonText}>Add Medicine</Text>
      </Pressable>

      <DosageUnitPicker
        visible={isDosageUnitModalVisible}
        onClose={() => setDosageUnitModalVisible(false)}
        onSelect={(unit) => {
          setDosageUnit(unit);
          setDosageUnitModalVisible(false);
        }}
      />

      <IntakeModePicker
        visible={isIntakeModeModalVisible}
        onClose={() => setIntakeModeModalVisible(false)}
        onSelect={(mode) => {
          setIntakeMode(mode);
          setIntakeModeModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default AddMedicineScreen; 