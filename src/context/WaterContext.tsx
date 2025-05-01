import React, { createContext, useState, useContext, useEffect } from 'react';

interface WaterContextData {
  currentIntake: number;
  totalGoal: number;
  intakeVolume: number;
  measurement: string;
  lastResetDate: string;
  setCurrentIntake: (value: number) => void;
  setTotalGoal: (value: number) => void;
  setIntakeVolume: (value: number) => void;
  setMeasurement: (value: string) => void;
  addWaterIntake: () => void;
}

const WaterContext = createContext<WaterContextData>({} as WaterContextData);

export const WaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [totalGoal, setTotalGoal] = useState(2500);
  const [intakeVolume, setIntakeVolume] = useState(250);
  const [measurement, setMeasurement] = useState('ml');
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());

  useEffect(() => {
    // Reset intake if it's a new day
    const today = new Date().toDateString();
    if (lastResetDate !== today) {
      setCurrentIntake(0);
      setLastResetDate(today);
    }
  }, [lastResetDate]);

  const addWaterIntake = () => {
    if (currentIntake + intakeVolume <= totalGoal) {
      setCurrentIntake(currentIntake + intakeVolume);
    }
  };

  return (
    <WaterContext.Provider
      value={{
        currentIntake,
        totalGoal,
        intakeVolume,
        measurement,
        lastResetDate,
        setCurrentIntake,
        setTotalGoal,
        setIntakeVolume,
        setMeasurement,
        addWaterIntake,
      }}
    >
      {children}
    </WaterContext.Provider>
  );
};

export const useWater = () => useContext(WaterContext); 