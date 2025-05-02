import React, { useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { allSymptoms } from '../data/SymptomsList';
import stylesAddSymptomModal from '../styles/styles-screen/StylesAddSymptomModal';

interface AddSymptomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedSymptoms: string[]) => void;
}

const AddSymptomModal: React.FC<AddSymptomModalProps> = ({ visible, onClose, onSave }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

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
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={stylesAddSymptomModal.modalContainer}>
        <View style={stylesAddSymptomModal.modalContent}>
          <View style={stylesAddSymptomModal.modalHeader}>
            <Text style={stylesAddSymptomModal.modalTitle}>Add Symptoms</Text>
            <Pressable onPress={onClose} style={stylesAddSymptomModal.closeButton}>
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
        </View>
      </View>
    </Modal>
  );
};

export default AddSymptomModal; 