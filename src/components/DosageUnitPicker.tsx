import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DosageUnitPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (unit: string) => void;
}

const dosageUnits = [
  { value: 'mg', label: 'Milligrams (mg)' },
  { value: 'g', label: 'Grams (g)' },
  { value: 'ml', label: 'Milliliters (ml)' },
  { value: 'l', label: 'Liters (l)' },
  { value: 'tsp', label: 'Teaspoon (tsp)' },
  { value: 'tbsp', label: 'Tablespoon (tbsp)' },
  { value: 'pcs', label: 'Pieces (pcs)' },
  { value: 'drops', label: 'Drops' },
];

const DosageUnitPicker: React.FC<DosageUnitPickerProps> = ({ visible, onClose, onSelect }) => {
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
            <Text style={styles.modalTitle}>Select Dosage Unit</Text>
            <Pressable onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#177581" />
            </Pressable>
          </View>
          
          <View style={styles.unitsContainer}>
            {dosageUnits.map((unit) => (
              <Pressable
                key={unit.value}
                style={styles.unitItem}
                onPress={() => {
                  onSelect(unit.value);
                  onClose();
                }}
              >
                <Text style={styles.unitText}>{unit.label}</Text>
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
  unitsContainer: {
    maxHeight: '80%',
  },
  unitItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  unitText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DosageUnitPicker; 