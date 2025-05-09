import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useWater } from '../context/WaterContext';
import TopNavigationBar from '../components/TopNavigationBar';
import WaterLevelIndicator from '../components/WaterLevelIndicator';
import stylesWaterTracker from '../styles/styles-screen/StylesWaterTrackerScreen';

const WaterTrackerScreen = ({ navigation }: any) => {
  const { 
    currentIntake,
    totalGoal,
    intakeVolume,
    intakes,
    addWaterIntake,
    removeIntake,
    setTotalGoal,
    setIntakeVolume,
    resetIntake,
    setCurrentIntake,
    setIntakes
  } = useWater();

  const [isGoalModalVisible, setGoalModalVisible] = useState(false);
  const [isVolumeModalVisible, setVolumeModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('tracker'); // 'tracker', 'history', 'trends'
  const [newGoal, setNewGoal] = useState(totalGoal.toString());
  const [volumeInput, setVolumeInput] = useState(intakeVolume.toString());

  const handleVolumeChange = (value: string) => {
    // Allow empty string for better UX when backspacing
    if (value === '') {
      setVolumeInput('');
      setIntakeVolume(0);
      return;
    }
    
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setVolumeInput(value);
      setIntakeVolume(numValue);
    }
  };

  const handleSetGoal = () => {
    const goalValue = parseInt(newGoal) || 0;
    setTotalGoal(goalValue);
    setGoalModalVisible(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleDeletePress = (id: string) => {
    Alert.alert(
      'Delete Intake',
      'Are you sure you want to delete this water intake?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeIntake(id),
        },
      ],
    );
  };

  const renderIntakeHistory = () => {
    return intakes.map((intake) => (
      <View key={intake.id} style={stylesWaterTracker.intakeItem}>
        <View style={stylesWaterTracker.intakeInfo}>
          <Text style={stylesWaterTracker.intakeAmount}>{intake.amount} ml</Text>
          <Text style={stylesWaterTracker.intakeTime}>{formatTime(intake.timestamp)}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeletePress(intake.id)}>
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

  const renderContent = () => {
    switch (activeTab) {
      case 'tracker':
        return (
          <View style={stylesWaterTracker.trackerContent}>
            <WaterLevelIndicator
              currentIntake={currentIntake}
              totalGoal={totalGoal}
              size={220}
              style={stylesWaterTracker.centeredWaterLevel}
            />
            <View style={stylesWaterTracker.waterTextContainer}>
              <Text style={stylesWaterTracker.waterText}>{currentIntake} ml</Text>
              <Text style={stylesWaterTracker.goalText}>/ {totalGoal} ml</Text>
            </View>
            <TouchableOpacity style={stylesWaterTracker.addButton} onPress={addWaterIntake}>
              <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>
          </View>
        );
      case 'history':
        return (
          <ScrollView style={stylesWaterTracker.intakeHistory} showsVerticalScrollIndicator={false}>
            <Text style={stylesWaterTracker.historyTitle}>Today's Intake History</Text>
            {intakes.length > 0 ? (
              renderIntakeHistory()
            ) : (
              <Text style={stylesWaterTracker.emptyHistoryText}>No water intake recorded today</Text>
            )}
          </ScrollView>
        );
      case 'trends':
        return (
          <View style={stylesWaterTracker.trendsContainer}>
            <Text style={stylesWaterTracker.trendsTitle}>Weekly Progress</Text>
            <Text style={stylesWaterTracker.comingSoonText}>Trends visualization coming soon!</Text>
          </View>
        );
    }
  };

  const renderVolumeModal = () => (
    <Modal
      visible={isVolumeModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setVolumeModalVisible(false)}
    >
      <TouchableOpacity 
        style={stylesWaterTracker.modalContainer}
        activeOpacity={1}
        onPress={() => setVolumeModalVisible(false)}
      >
        <TouchableOpacity 
          activeOpacity={1}
          style={stylesWaterTracker.modalContent}
          onPress={e => e.stopPropagation()}
        >
          <Text style={stylesWaterTracker.modalTitle}>Volume per Intake</Text>

          <TextInput
            style={stylesWaterTracker.goalInput}
            keyboardType="numeric"
            value={volumeInput}
            onChangeText={handleVolumeChange}
            placeholder="Enter volume"
            placeholderTextColor="#a0a0a0"
          />

          <View style={stylesWaterTracker.modalButtons}>
            <TouchableOpacity
              style={[stylesWaterTracker.modalButton, { backgroundColor: '#e0e0e0' }]}
              onPress={() => {
                setVolumeInput(intakeVolume.toString());
                setVolumeModalVisible(false);
              }}
            >
              <Text style={[stylesWaterTracker.modalButtonText, { color: '#666' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesWaterTracker.modalButton}
              onPress={() => {
                setVolumeModalVisible(false);
              }}
            >
              <Text style={stylesWaterTracker.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  const renderGoalModal = () => (
    <Modal
      visible={isGoalModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setGoalModalVisible(false)}
    >
      <TouchableOpacity 
        style={stylesWaterTracker.modalContainer}
        activeOpacity={1}
        onPress={() => setGoalModalVisible(false)}
      >
        <TouchableOpacity 
          activeOpacity={1}
          style={stylesWaterTracker.modalContent}
          onPress={e => e.stopPropagation()}
        >
          <Text style={stylesWaterTracker.modalTitle}>Set Daily Goal</Text>
          <TextInput
            style={stylesWaterTracker.goalInput}
            keyboardType="numeric"
            value={newGoal}
            onChangeText={setNewGoal}
            placeholder="Enter goal"
            placeholderTextColor="#a0a0a0"
          />
          <View style={stylesWaterTracker.modalButtons}>
            <TouchableOpacity
              style={[stylesWaterTracker.modalButton, { backgroundColor: '#e0e0e0' }]}
              onPress={() => setGoalModalVisible(false)}
            >
              <Text style={[stylesWaterTracker.modalButtonText, { color: '#666' }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesWaterTracker.modalButton}
              onPress={handleSetGoal}
            >
              <Text style={[stylesWaterTracker.modalButtonText]}>Set Goal</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={stylesWaterTracker.container}>  
      <View style={stylesWaterTracker.toggleContainer}>
        <TouchableOpacity
          style={[
            stylesWaterTracker.toggleButton,
            activeTab === 'tracker' && stylesWaterTracker.toggleButtonSelected
          ]}
          onPress={() => setActiveTab('tracker')}
        >
          <Text style={[
            stylesWaterTracker.toggleText,
            activeTab === 'tracker' && { color: 'white' }
          ]}>Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            stylesWaterTracker.toggleButton,
            activeTab === 'history' && stylesWaterTracker.toggleButtonSelected
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[
            stylesWaterTracker.toggleText,
            activeTab === 'history' && { color: 'white' }
          ]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            stylesWaterTracker.toggleButton,
            activeTab === 'trends' && stylesWaterTracker.toggleButtonSelected
          ]}
          onPress={() => setActiveTab('trends')}
        >
          <Text style={[
            stylesWaterTracker.toggleText,
            activeTab === 'trends' && { color: 'white' }
          ]}>Trends</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}

      <View style={stylesWaterTracker.bottomControls}>
        <TouchableOpacity 
          style={stylesWaterTracker.buttonContainer}
          onPress={() => setVolumeModalVisible(true)}
        >
          <View style={stylesWaterTracker.iconButton}>
            <MaterialCommunityIcons name="cup-water" size={24} style={stylesWaterTracker.bottomControlsIcon} />
          </View>
          <Text style={stylesWaterTracker.buttonText}>Volume</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={stylesWaterTracker.buttonContainer}
          onPress={() => setGoalModalVisible(true)}
        >
          <View style={stylesWaterTracker.iconButton}>
            <MaterialCommunityIcons name="target" size={24} style={stylesWaterTracker.bottomControlsIcon} />
          </View>
          <Text style={stylesWaterTracker.buttonText}>Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={stylesWaterTracker.buttonContainer}
          onPress={handleReset}
        >
          <View style={stylesWaterTracker.iconButton}>
            <MaterialCommunityIcons name="refresh" size={24} style={stylesWaterTracker.bottomControlsIcon} />
          </View>
          <Text style={stylesWaterTracker.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {renderVolumeModal()}
      {renderGoalModal()}
    </View>
  );
};

export default WaterTrackerScreen; 