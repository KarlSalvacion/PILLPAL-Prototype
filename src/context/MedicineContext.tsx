import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Medicine } from '../types/Medicine';

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => Promise<void>;
  markMedicineAsDone: (id: string) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const STORAGE_KEY = '@medicines';

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const MedicineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      setLoading(true);
      const storedMedicines = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMedicines) {
        setMedicines(JSON.parse(storedMedicines));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading medicines:', error);
      setError('Failed to load medicines');
      setLoading(false);
    }
  };

  const saveMedicines = async (medicinesToSave: Medicine[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(medicinesToSave));
    } catch (error) {
      console.error('Error saving medicines:', error);
      setError('Failed to save medicines');
    }
  };

  const addMedicine = async (medicine: Omit<Medicine, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      
      const newMedicine = {
        ...medicine,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedMedicines = [newMedicine, ...medicines];
      setMedicines(updatedMedicines);
      await saveMedicines(updatedMedicines);
      setLoading(false);
    } catch (error) {
      console.error('Error adding medicine:', error);
      setError('Failed to add medicine');
      setLoading(false);
      throw error;
    }
  };

  const markMedicineAsDone = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedMedicines = medicines.map(medicine => 
        medicine.id === id 
          ? { ...medicine, isActive: false, updatedAt: new Date().toISOString() }
          : medicine
      );
      
      setMedicines(updatedMedicines);
      await saveMedicines(updatedMedicines);
      setLoading(false);
    } catch (error) {
      console.error('Error marking medicine as done:', error);
      setError('Failed to update medicine status');
      setLoading(false);
      throw error;
    }
  };

  const deleteMedicine = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedMedicines = medicines.filter(medicine => medicine.id !== id);
      setMedicines(updatedMedicines);
      await saveMedicines(updatedMedicines);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting medicine:', error);
      setError('Failed to delete medicine');
      setLoading(false);
      throw error;
    }
  };

  return (
    <MedicineContext.Provider value={{ 
      medicines, 
      addMedicine, 
      markMedicineAsDone, 
      deleteMedicine,
      loading,
      error
    }}>
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicine = () => {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error('useMedicine must be used within a MedicineProvider');
  }
  return context;
}; 