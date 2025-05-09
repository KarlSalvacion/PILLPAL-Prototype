import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, Pressable, ScrollView, Animated, PanResponder } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { allSymptoms } from '../data/SymptomsList';
import stylesAddSymptomModal from '../styles/styles-screen/StylesAddSymptomModal';

interface AddSymptomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedSymptoms: string[]) => void;
}

const AddSymptomModal: React.FC<AddSymptomModalProps> = ({ visible, onClose, onSave }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
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

  const handleSymptomSelect = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      }
      return [...prev, symptomId];
    });
  };

  const handleSave = () => {
    onSave(selectedSymptoms);
    handleClose();
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
          stylesAddSymptomModal.modalContainer,
          { opacity: fadeAnim }
        ]}
      >
        <Pressable 
          style={stylesAddSymptomModal.modalOverlay}
          onPress={handleClose}
        >
          <BlurView
            intensity={40}
            tint="dark"
            style={stylesAddSymptomModal.blurView}
          />
        </Pressable>
        <Animated.View 
          style={[
            stylesAddSymptomModal.modalContent,
            {
              transform: [
                { translateY: Animated.add(slideAnim, pan.y) }
              ]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <View style={stylesAddSymptomModal.indicatorContainer}>
            <View style={stylesAddSymptomModal.indicator} />
          </View>

          <View style={stylesAddSymptomModal.modalHeader}>
            <Text style={stylesAddSymptomModal.modalTitle}>Add Symptoms</Text>
            <Pressable onPress={handleClose} style={stylesAddSymptomModal.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color="#177581" />
            </Pressable>
          </View>

          <ScrollView style={stylesAddSymptomModal.symptomsList}>
            {allSymptoms.map(symptom => (
              <Pressable
                key={symptom.id}
                style={stylesAddSymptomModal.symptomItem}
                onPress={() => handleSymptomSelect(symptom.id)}
              >
                <Text style={stylesAddSymptomModal.symptomText}>{symptom.name}</Text>
                <View style={[
                  stylesAddSymptomModal.checkbox,
                  selectedSymptoms.includes(symptom.id) && stylesAddSymptomModal.checkboxChecked
                ]}>
                  {selectedSymptoms.includes(symptom.id) && (
                    <MaterialCommunityIcons name="check" size={16} color="#fff" />
                  )}
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable style={stylesAddSymptomModal.saveButton} onPress={handleSave}>
            <Text style={stylesAddSymptomModal.saveButtonText}>Save Symptoms</Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

export default AddSymptomModal; 