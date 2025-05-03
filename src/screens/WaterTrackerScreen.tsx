import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavigationBar from '../components/TopNavigationBar';
import stylesWaterTracker from '../styles/styles-screen/StylesWaterTrackerScreen';

interface WaterTrackerData {
  intakeVolume: number;
  measurement: string;
  totalGoal: number;
  currentIntake: number;
  lastResetDate: string;
}

const STORAGE_KEY = '@water_tracker_data';

const WaterTrackerScreen = ({ navigation }: any) => {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [totalGoal, setTotalGoal] = useState(2500);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState(totalGoal.toString());
  const [isVolumeModalVisible, setVolumeModalVisible] = useState(false);
  const [intakeVolume, setIntakeVolume] = useState(250);
  const [measurement, setMeasurement] = useState('ml');
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());

  // Load saved data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        const defaultData: WaterTrackerData = {
          intakeVolume: 250,
          measurement: 'ml',
          totalGoal: 2500,
          currentIntake: 0,
          lastResetDate: new Date().toDateString()
        };

        if (savedData) {
          const data = JSON.parse(savedData) as WaterTrackerData;
          setIntakeVolume(data.intakeVolume);
          setMeasurement(data.measurement);
          setTotalGoal(data.totalGoal);
          setCurrentIntake(data.currentIntake);
          setLastResetDate(data.lastResetDate);

          // Reset intake if it's a new day
          const today = new Date().toDateString();
          if (data.lastResetDate !== today) {
            setCurrentIntake(0);
            setLastResetDate(today);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
              ...data,
              currentIntake: 0,
              lastResetDate: today
            }));
          }
        } else {
          // Initialize with default values
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
        }
      } catch (error) {
        console.error('Error loading water tracker data:', error);
      }
    };
    loadData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
          currentIntake,
          totalGoal,
          intakeVolume,
          measurement,
          lastResetDate
        }));
      } catch (error) {
        console.error('Error saving water tracker data:', error);
      }
    };
    saveData();
  }, [currentIntake, totalGoal, intakeVolume, measurement, lastResetDate]);

  const addWaterIntake = () => {
    if (currentIntake + intakeVolume <= totalGoal) {
      setCurrentIntake(currentIntake + intakeVolume);
    }
  };

  const saveVolumeAndMeasurement = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
        intakeVolume,
        measurement,
        currentIntake,
        totalGoal,
        lastResetDate
      }));
      Alert.alert('Saved!', 'Your volume and measurement have been updated.');
      setVolumeModalVisible(false);
    } catch (error) {
      console.error('Error saving volume and measurement:', error);
    }
  };

  const handleVolumeChange = (value: string) => {
    const newVolume = parseInt(value) || 0;
    setIntakeVolume(newVolume);
  };

  const handleSetGoal = () => {
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal) && parsedGoal > 0) {
      setTotalGoal(parsedGoal);
    }
    setGoalModalVisible(false);
  };

  return (
    <View style={stylesWaterTracker.container}>

      <Text style={stylesWaterTracker.title}>Stay Hydrated</Text>
      <View style={stylesWaterTracker.toggleContainer}>
        <TouchableOpacity style={stylesWaterTracker.toggleButtonSelected}>
          <Text style={stylesWaterTracker.trackerText}>Tracker</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={stylesWaterTracker.toggleButton}>
          <Text style={stylesWaterTracker.toggleText}>Trends</Text>
        </TouchableOpacity>
      </View>

      {/* Goal Card */}
      <View style={stylesWaterTracker.goalCard}>
        <Text style={stylesWaterTracker.goalTime}>11:00 AM</Text>
        <Text style={stylesWaterTracker.goalDetails}>250ml water (1 Glass)</Text>
        <TouchableOpacity style={stylesWaterTracker.addGoalButton} onPress={() => setGoalModalVisible(true)}>
          <Text style={stylesWaterTracker.addGoalText}>Add Your Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Water Intake Progress */}
      <View style={stylesWaterTracker.waterTracker}>
        <Text style={stylesWaterTracker.waterText}>{currentIntake} ml</Text>
        <Text style={stylesWaterTracker.goalText}>/ {totalGoal} ml</Text>
        <TouchableOpacity style={stylesWaterTracker.addButton} onPress={addWaterIntake}>
          <Text style={stylesWaterTracker.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={stylesWaterTracker.bottomControls}>
        <View style={stylesWaterTracker.buttonContainer}>
          <TouchableOpacity 
            style={stylesWaterTracker.iconButton} 
            onPress={() => setGoalModalVisible(true)}
          >
            <AntDesign name="star" style={stylesWaterTracker.bottomControlsIcon} />
          </TouchableOpacity>
          <Text style={stylesWaterTracker.buttonText}>Change Goal</Text>
        </View>

        <View style={stylesWaterTracker.buttonContainer}>
          <TouchableOpacity 
            style={stylesWaterTracker.iconButton} 
            onPress={() => setVolumeModalVisible(true)}
          >
            <MaterialCommunityIcons name="cup-water" style={stylesWaterTracker.bottomControlsIcon} />
          </TouchableOpacity>
          <Text style={stylesWaterTracker.buttonText}>Change Volume</Text>
        </View>
      </View>

      {/* Volume Modal */}
      <Modal transparent={true} visible={isVolumeModalVisible} animationType="slide">
        <View style={stylesWaterTracker.modalContainer}>
          <View style={stylesWaterTracker.modalContent}>
            <Text style={stylesWaterTracker.modalTitle}>Volume per Intake</Text>
            <TextInput
              style={stylesWaterTracker.goalInput}
              keyboardType="numeric"
              value={intakeVolume.toString()}
              onChangeText={handleVolumeChange}
            />
            <TouchableOpacity onPress={() => setMeasurement(measurement === 'ml' ? 'oz' : 'ml')}>
              <Text style={stylesWaterTracker.modalButtonText}>{measurement.toUpperCase()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesWaterTracker.modalButton} onPress={saveVolumeAndMeasurement}>
              <Text style={stylesWaterTracker.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Goal Modal */}
      <Modal transparent={true} visible={goalModalVisible} animationType="slide">
        <View style={stylesWaterTracker.modalContainer}>
          <View style={stylesWaterTracker.modalContent}>
            <Text style={stylesWaterTracker.modalTitle}>Water Intake Goal</Text>
            <TextInput
              style={stylesWaterTracker.goalInput}
              keyboardType="numeric"
              value={newGoal}
              onChangeText={setNewGoal}
            />
            <View style={stylesWaterTracker.modalButtons}>
              <TouchableOpacity style={stylesWaterTracker.modalButton} onPress={() => setGoalModalVisible(false)}>
                <Text style={stylesWaterTracker.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesWaterTracker.modalButton} onPress={handleSetGoal}>
                <Text style={stylesWaterTracker.modalButtonText}>Set Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WaterTrackerScreen; 