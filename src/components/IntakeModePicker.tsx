import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, Animated, PanResponder, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface IntakeModePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (mode: string) => void;
}

type IconName = 'pill' | 'needle' | 'hand-heart' | 'air-filter' | 'pill';

interface IntakeMode {
  value: string;
  label: string;
  icon: IconName;
}

const intakeModes: IntakeMode[] = [
  { value: 'oral', label: 'Oral', icon: 'pill' },
  { value: 'injection', label: 'Injection', icon: 'needle' },
  { value: 'topical', label: 'Topical', icon: 'hand-heart' },
  { value: 'inhalation', label: 'Inhalation', icon: 'air-filter' },
  { value: 'sublingual', label: 'Sublingual', icon: 'pill' },
  { value: 'rectal', label: 'Rectal', icon: 'pill' },
];

const IntakeModePicker: React.FC<IntakeModePickerProps> = ({ visible, onClose, onSelect }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (visible) {
      pan.setValue({ x: 0, y: 0 });
      fadeAnim.setValue(0);
      slideAnim.setValue(1000);
      
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 50,
          stiffness: 300,
        })
      ]).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.y.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          handleClose();
        } else {
          Animated.spring(pan.y, {
            toValue: 0,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(pan.y, {
        toValue: 1000,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      })
    ]).start(onClose);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View 
        style={[
          styles.modalContainer,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={handleClose}
        >
          <BlurView
            intensity={40}
            tint="dark"
            style={styles.blurView}
          />
        </TouchableOpacity>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [
                { translateY: Animated.add(slideAnim, pan.y) }
              ]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
          </View>

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Intake Mode</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialCommunityIcons name="close" size={24} color="#177581" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modesContainer}>
            {intakeModes.map((mode) => (
              <TouchableOpacity
                key={mode.value}
                style={styles.modeItem}
                onPress={() => {
                  onSelect(mode.value);
                  handleClose();
                }}
              >
                <MaterialCommunityIcons name={mode.icon} size={24} color="#177581" />
                <Text style={styles.modeText}>{mode.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    minHeight: '70%',
    maxHeight: '80%',
  },
  indicatorContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#177581',
  },
  modesContainer: {
    maxHeight: '80%',
  },
  modeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 15,
  },
  modeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default IntakeModePicker;