import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Intake Mode</Text>
            <Pressable onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#177581" />
            </Pressable>
          </View>
          
          <View style={styles.modesContainer}>
            {intakeModes.map((mode) => (
              <Pressable
                key={mode.value}
                style={styles.modeItem}
                onPress={() => {
                  onSelect(mode.value);
                  onClose();
                }}
              >
                <MaterialCommunityIcons name={mode.icon} size={24} color="#177581" />
                <Text style={styles.modeText}>{mode.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
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