import React, { createContext, useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Medicine } from '../types/Medicine';

interface MedicineContextType {
  medicines: Medicine[];
  addMedicine: (medicine: Omit<Medicine, 'id'>) => Promise<void>;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const MedicineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const addMedicine = async (medicine: Omit<Medicine, 'id'>) => {
    try {
      const docRef = await addDoc(collection(db, 'medicines'), {
        ...medicine,
        nextReminder: new Date().toISOString(),
        isActive: true
      });
      setMedicines([...medicines, { ...medicine, id: docRef.id, nextReminder: new Date().toISOString(), isActive: true }]);
    } catch (error) {
      console.error('Error adding medicine:', error);
      throw error;
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine }}>
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