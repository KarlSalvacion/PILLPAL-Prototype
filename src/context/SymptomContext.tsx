import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Symptom } from '../data/SymptomsList';

interface SymptomContextType {
  selectedSymptoms: Symptom[];
  toggleSymptom: (symptom: Symptom) => void;
}

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export const SymptomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms(prev => {
      const isSelected = prev.some(s => s.id === symptom.id);
      if (isSelected) {
        return prev.filter(s => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  return (
    <SymptomContext.Provider value={{ selectedSymptoms, toggleSymptom }}>
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