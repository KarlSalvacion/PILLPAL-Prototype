import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { allSymptoms } from '../data/SymptomsList';

interface TrackedSymptom {
  id: string;
  name: string;
  isChecked: boolean;
  treatment?: string;
}

interface SymptomContextType {
  trackedSymptoms: TrackedSymptom[];
  addSymptoms: (symptoms: string[]) => Promise<void>;
  removeSymptom: (id: string) => Promise<void>;
  toggleSymptom: (id: string) => Promise<void>;
}

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export const SymptomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trackedSymptoms, setTrackedSymptoms] = useState<TrackedSymptom[]>([]);

  useEffect(() => {
    loadTrackedSymptoms();
  }, []);

  const loadTrackedSymptoms = async () => {
    try {
      const storedSymptoms = await AsyncStorage.getItem('trackedSymptoms');
      if (storedSymptoms) {
        setTrackedSymptoms(JSON.parse(storedSymptoms));
      }
    } catch (error) {
      console.error('Error loading tracked symptoms:', error);
    }
  };

  const saveTrackedSymptoms = async (symptoms: TrackedSymptom[]) => {
    try {
      await AsyncStorage.setItem('trackedSymptoms', JSON.stringify(symptoms));
      setTrackedSymptoms(symptoms);
    } catch (error) {
      console.error('Error saving tracked symptoms:', error);
    }
  };

  const addSymptoms = async (symptomIds: string[]) => {
    const newSymptoms = symptomIds.map(id => {
      const symptom = allSymptoms.find(s => s.id === id);
      return {
        id,
        name: symptom?.name || '',
        isChecked: false,
        treatment: symptom?.treatment
      };
    });

    const updatedSymptoms = [...trackedSymptoms];
    newSymptoms.forEach(newSymptom => {
      if (!updatedSymptoms.some(s => s.id === newSymptom.id)) {
        updatedSymptoms.push(newSymptom);
      }
    });

    await saveTrackedSymptoms(updatedSymptoms);
  };

  const removeSymptom = async (id: string) => {
    const updatedSymptoms = trackedSymptoms.filter(symptom => symptom.id !== id);
    await saveTrackedSymptoms(updatedSymptoms);
  };

  const toggleSymptom = async (id: string) => {
    const updatedSymptoms = trackedSymptoms.map(symptom => {
      if (symptom.id === id) {
        return { ...symptom, isChecked: !symptom.isChecked };
      }
      return symptom;
    });
    await saveTrackedSymptoms(updatedSymptoms);
  };

  return (
    <SymptomContext.Provider value={{ trackedSymptoms, addSymptoms, removeSymptom, toggleSymptom }}>
      {children}
    </SymptomContext.Provider>
  );
};

export const useSymptoms = () => {
  const context = useContext(SymptomContext);
  if (context === undefined) {
    throw new Error('useSymptoms must be used within a SymptomProvider');
  }
  return context;
}; 