import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useWater } from '../context/WaterContext';
import TopNavigationBar from '../components/TopNavigationBar';
import stylesWaterTracker from '../styles/styles-screen/StylesWaterTrackerScreen';

const WaterTrackerScreen = ({ navigation }: any) => {
  const { 
    currentIntake, 
    totalGoal, 
    intakeVolume, 
    measurement, 
    intakes,
    addWaterIntake,
    removeIntake,
    setTotalGoal,
    setIntakeVolume,
    setMeasurement,
    resetIntake
  } = useWater();

  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState(totalGoal.toString());
  const [isVolumeModalVisible, setVolumeModalVisible] = useState(false);
  const [showTrends, setShowTrends] = useState(false);

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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderIntakeHistory = () => {
    return intakes.map((intake) => (
      <View key={intake.id} style={stylesWaterTracker.intakeItem}>
        <View style={stylesWaterTracker.intakeInfo}>
          <MaterialCommunityIcons name="cup-water" size={24} color="rgb(23, 117, 129)" />
          <Text style={stylesWaterTracker.intakeAmount}>{intake.amount} {measurement}</Text>
          <Text style={stylesWaterTracker.intakeTime}>{formatTime(intake.timestamp)}</Text>
        </View>
        <TouchableOpacity onPress={() => removeIntake(intake.id)}>
          <AntDesign name="delete" size={20} color="rgb(23, 117, 129)" />
        </TouchableOpacity>
      </View>
    ));
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Water Intake',
      'Are you sure you want to reset today\'s water intake?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetIntake();
          },
        },
      ],
    );
  };

  return (
    <View style={stylesWaterTracker.container}>
      <View style={stylesWaterTracker.toggleContainer}>
        <TouchableOpacity 
          style={[stylesWaterTracker.toggleButton, !showTrends && stylesWaterTracker.toggleButtonSelected]}
          onPress={() => setShowTrends(false)}
        >
          <Text style={[stylesWaterTracker.toggleText, !showTrends && stylesWaterTracker.trackerText]}>
            Tracker
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[stylesWaterTracker.toggleButton, showTrends && stylesWaterTracker.toggleButtonSelected]}
          onPress={() => setShowTrends(true)}
        >
          <Text style={[stylesWaterTracker.toggleText, showTrends && stylesWaterTracker.trackerText]}>
            Trends
          </Text>
        </TouchableOpacity>
      </View>

      {!showTrends ? (
        <>
          {/* Water Intake Progress */}
          <View style={stylesWaterTracker.waterTracker}>
            <Text style={stylesWaterTracker.waterText}>{currentIntake} {measurement}</Text>
            <Text style={stylesWaterTracker.goalText}>/ {totalGoal} {measurement}</Text>
            <TouchableOpacity style={stylesWaterTracker.addButton} onPress={addWaterIntake}>
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          </View>

          {/* Intake History */}
          <ScrollView style={stylesWaterTracker.intakeHistory}>
            <Text style={stylesWaterTracker.historyTitle}>Today's Intake History</Text>
            {intakes.length > 0 ? (
              renderIntakeHistory()
            ) : (
              <Text style={stylesWaterTracker.emptyHistoryText}>No water intake recorded today</Text>
            )}
          </ScrollView>
        </>
      ) : (
        <View style={stylesWaterTracker.trendsContainer}>
          <Text style={stylesWaterTracker.trendsTitle}>Weekly Progress</Text>
          <Text style={stylesWaterTracker.comingSoonText}>Trends visualization coming soon!</Text>
        </View>
      )}

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

        <View style={stylesWaterTracker.buttonContainer}>
          <TouchableOpacity 
            style={stylesWaterTracker.iconButton} 
            onPress={handleReset}
          >
            <MaterialCommunityIcons name="refresh" style={stylesWaterTracker.bottomControlsIcon} />
          </TouchableOpacity>
          <Text style={stylesWaterTracker.buttonText}>Reset</Text>
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
            <TouchableOpacity 
              style={stylesWaterTracker.modalButton} 
              onPress={() => setVolumeModalVisible(false)}
            >
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