import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, Platform, Switch, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMedicine } from '../context/MedicineContext';
import { useNotification } from '../context/NotificationContext';
import DosageUnitPicker from '../components/DosageUnitPicker';
import IntakeModePicker from '../components/IntakeModePicker';
import stylesAddMedicine from '../styles/styles-screen/StylesAddMedicine';

const AddMedicineScreen = ({ navigation }: any) => {
  const { addMedicine } = useMedicine();
  const { scheduleNotification } = useNotification();
  const [medicineName, setMedicineName] = useState('');
  const [dosageAmount, setDosageAmount] = useState('');
  const [dosageUnit, setDosageUnit] = useState('mg');
  const [intakeMode, setIntakeMode] = useState('oral');
  const [isDosageUnitModalVisible, setDosageUnitModalVisible] = useState(false);
  const [isIntakeModeModalVisible, setIntakeModeModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const [intervalHours, setIntervalHours] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [quantity, setQuantity] = useState('1');

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

  const handleAddMedicine = async () => {
    if (!medicineName || !dosageAmount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (isRepeating && (!repeatCount || !intervalHours)) {
      Alert.alert('Error', 'Please specify repeat count and interval for repeating medicine');
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
                isRepeating: isRepeating,
                repeatCount: isRepeating ? repeatCount : 1,
                intervalHours: isRepeating ? intervalHours : 0,
                quantity: parseInt(quantity) || 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };

              const notificationId = await scheduleNotification(newMedicine);
              await addMedicine({ ...newMedicine, notificationId: notificationId as unknown as string });
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={stylesAddMedicine.container}>
          <View style={stylesAddMedicine.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={36} color="#177581" />
            </Pressable>
            <Text style={stylesAddMedicine.title}>Add New Medicine</Text>
          </View>

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
            <Text style={stylesAddMedicine.label}>Quantity</Text>
            <View style={stylesAddMedicine.quantityContainer}>
              <Pressable 
                style={stylesAddMedicine.minusQuantityButton}
                onPress={() => setQuantity(prev => Math.max(1, parseInt(prev) - 1).toString())}
              >
                <MaterialCommunityIcons name="minus" size={24} color="#177581" />
              </Pressable>
              <TextInput
                style={[stylesAddMedicine.input, stylesAddMedicine.quantityInput]}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />
              <Pressable 
                style={stylesAddMedicine.addQuantityButton}
                onPress={() => setQuantity(prev => (parseInt(prev) + 1).toString())}
              >
                <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
              </Pressable>
            </View>
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

          <View style={stylesAddMedicine.inputGroup}>
            <View style={stylesAddMedicine.toggleContainer}>
              <Text style={stylesAddMedicine.label}>Repeat Medicine</Text>
              <Switch
                value={isRepeating}
                onValueChange={setIsRepeating}
                trackColor={{ false: '#767577', true: '#177581' }}
                thumbColor={isRepeating ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {isRepeating && (
            <>
              <View style={stylesAddMedicine.inputGroup}>
                <Text style={stylesAddMedicine.label}>Number of Times</Text>
                <View style={stylesAddMedicine.quantityContainer}>
                  <Pressable 
                    style={stylesAddMedicine.minusQuantityButton}
                    onPress={() => setRepeatCount(prev => Math.max(1, prev - 1))}
                  >
                    <MaterialCommunityIcons name="minus" size={24} color="#177581" />
                  </Pressable>
                  <TextInput
                    style={[stylesAddMedicine.input, stylesAddMedicine.quantityInput]}
                    keyboardType="numeric"
                    value={repeatCount.toString()}
                    onChangeText={(text) => setRepeatCount(parseInt(text) || 1)}
                  />
                  <Pressable 
                    style={stylesAddMedicine.addQuantityButton}
                    onPress={() => setRepeatCount(prev => prev + 1)}
                  >
                    <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
                  </Pressable>
                </View>
              </View>

              <View style={stylesAddMedicine.inputGroup}>
                <Text style={stylesAddMedicine.label}>Interval (hours)</Text>
                <View style={stylesAddMedicine.quantityContainer}>
                  <Pressable 
                    style={stylesAddMedicine.minusQuantityButton}
                    onPress={() => setIntervalHours(prev => Math.max(1, prev - 1))}
                  >
                    <MaterialCommunityIcons name="minus" size={24} color="#177581" />
                  </Pressable>
                  <TextInput
                    style={[stylesAddMedicine.input, stylesAddMedicine.quantityInput]}
                    keyboardType="numeric"
                    value={intervalHours.toString()}
                    onChangeText={(text) => setIntervalHours(parseInt(text) || 1)}
                  />
                  <Pressable 
                    style={stylesAddMedicine.addQuantityButton}
                    onPress={() => setIntervalHours(prev => prev + 1)}
                  >
                    <MaterialCommunityIcons name="plus" size={24} color="#ffffff" />
                  </Pressable>
                </View>
              </View>
            </>
          )}

          <Pressable style={stylesAddMedicine.addMedicineButton} onPress={handleAddMedicine}>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddMedicineScreen; 