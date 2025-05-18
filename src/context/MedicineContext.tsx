import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  intakeMode: string;
  intakeTime: string;
  nextReminder: string;
  isActive: boolean;
  isRepeating: boolean;
  repeatCount: number;
  intervalHours: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  notificationId?: string;
}

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => Promise<void>;
  updateMedicine: (id: string, medicine: Partial<Medicine>) => Promise<void>;
  deleteMedicine: (id: string) => Promise<void>;
  loadMedicines: () => Promise<void>;
  markMedicineAsDone: (id: string) => Promise<void>;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const MedicineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const STORAGE_KEY = `medicines_${user?.id}`;
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const { cancelNotification, rescheduleNotifications } = useNotification();

  useEffect(() => {
    if (user?.id) {
      loadMedicines();
    } else {
      setMedicines([]); 
    }
  }, [user?.id]);

  const loadMedicines = async () => {
    if (!user?.id) return;
    try {
      const storedMedicines = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMedicines) {
        const parsedMedicines = JSON.parse(storedMedicines);
        setMedicines(parsedMedicines);
        await rescheduleNotifications();
      }
    } catch (error) {
      console.error('Error loading medicines:', error);
    }
  };

  const saveMedicines = async (newMedicines: Medicine[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMedicines));
      setMedicines(newMedicines);
    } catch (error) {
      console.error('Error saving medicines:', error);
    }
  };

  const addMedicine = async (medicine: Omit<Medicine, 'id'>) => {
    const newMedicine: Medicine = {
      ...medicine,
      id: Date.now().toString(),
    };
    await saveMedicines([...medicines, newMedicine]);
  };

  const updateMedicine = async (id: string, updates: Partial<Medicine>) => {
    const updatedMedicines = medicines.map(medicine => {
      if (medicine.id === id) {
        return { ...medicine, ...updates };
      }
      return medicine;
    });
    await saveMedicines(updatedMedicines);
  };

  const deleteMedicine = async (id: string) => {
    const medicineToDelete = medicines.find(m => m.id === id);
    if (medicineToDelete?.notificationId) {
      await cancelNotification(medicineToDelete.notificationId);
    }
    const updatedMedicines = medicines.filter(medicine => medicine.id !== id);
    await saveMedicines(updatedMedicines);
  };

  const markMedicineAsDone = async (id: string) => {
    const updatedMedicines = medicines.map(medicine => {
      if (medicine.id === id) {
        return { ...medicine, isActive: false, updatedAt: new Date().toISOString() };
      }
      return medicine;
    });
    await saveMedicines(updatedMedicines);
  };

  return (
    <MedicineContext.Provider value={{
      medicines,
      addMedicine,
      updateMedicine,
      deleteMedicine,
      loadMedicines,
      markMedicineAsDone,
    }}>
      {children}
    </MedicineContext.Provider>
  );
};

export const useMedicine = () => {
  const context = useContext(MedicineContext);
  if (context === undefined) {
    throw new Error('useMedicine must be used within a MedicineProvider');
  }
  return context;
};