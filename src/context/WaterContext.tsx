import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WaterIntake {
  id: string;
  amount: number;
  timestamp: string;
}

interface WaterContextData {
  currentIntake: number;
  totalGoal: number;
  intakeVolume: number;
  lastResetDate: string;
  intakes: WaterIntake[];
  addWaterIntake: () => void;
  removeIntake: (id: string) => void;
  setTotalGoal: (value: number) => void;
  setIntakeVolume: (value: number) => void;
  resetIntake: () => void;
  setCurrentIntake: (value: number) => void;
  setIntakes: (intakes: WaterIntake[]) => void;
}

const WaterContext = createContext<WaterContextData>({} as WaterContextData);

const STORAGE_KEY = '@water_tracker_data';

export const WaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [totalGoal, setTotalGoal] = useState(2500);
  const [intakeVolume, setIntakeVolume] = useState(250);
  const [lastResetDate, setLastResetDate] = useState(new Date().toDateString());
  const [intakes, setIntakes] = useState<WaterIntake[]>([]);

  // Check for new day and reset if needed
  useEffect(() => {
    const checkAndResetForNewDay = () => {
      const today = new Date().toDateString();
      if (lastResetDate !== today) {
        setCurrentIntake(0);
        setIntakes([]);
        setLastResetDate(today);
      }
    };

    // Check immediately on mount
    checkAndResetForNewDay();

    // Set up interval to check every minute
    const intervalId = setInterval(checkAndResetForNewDay, 60000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [lastResetDate]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        setIntakeVolume(data.intakeVolume);
        setTotalGoal(data.totalGoal);
        setCurrentIntake(data.currentIntake);
        setLastResetDate(data.lastResetDate);
        setIntakes(data.intakes || []);

        // Reset intake if it's a new day
        const today = new Date().toDateString();
        if (data.lastResetDate !== today) {
          setCurrentIntake(0);
          setIntakes([]);
          setLastResetDate(today);
          await saveData({
            ...data,
            currentIntake: 0,
            lastResetDate: today,
            intakes: []
          });
        }
      }
    } catch (error) {
      console.error('Error loading water tracker data:', error);
    }
  };

  const saveData = useCallback(async (data: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving water tracker data:', error);
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    saveData({
      currentIntake,
      totalGoal,
      intakeVolume,
      lastResetDate,
      intakes
    });
  }, [currentIntake, totalGoal, intakeVolume, lastResetDate, intakes, saveData]);

  const addWaterIntake = useCallback(() => {
    if (currentIntake + intakeVolume <= totalGoal) {
      const newIntake: WaterIntake = {
        id: Date.now().toString(),
        amount: intakeVolume,
        timestamp: new Date().toISOString()
      };
      
      setIntakes(prevIntakes => [...prevIntakes, newIntake]);
      setCurrentIntake(prevIntake => prevIntake + intakeVolume);
    }
  }, [currentIntake, intakeVolume, totalGoal]);

  const removeIntake = useCallback((id: string) => {
    setIntakes(prevIntakes => {
      const intakeToRemove = prevIntakes.find(intake => intake.id === id);
      if (intakeToRemove) {
        setCurrentIntake(prevIntake => prevIntake - intakeToRemove.amount);
        return prevIntakes.filter(intake => intake.id !== id);
      }
      return prevIntakes;
    });
  }, []);

  const resetIntake = useCallback(() => {
    setCurrentIntake(0);
    setIntakes([]);
  }, []);

  const value = {
    currentIntake,
    totalGoal,
    intakeVolume,
    lastResetDate,
    intakes,
    addWaterIntake,
    removeIntake,
    setTotalGoal,
    setIntakeVolume,
    resetIntake,
    setCurrentIntake,
    setIntakes
  };

  return (
    <WaterContext.Provider value={value}>
      {children}
    </WaterContext.Provider>
  );
};

export const useWater = () => {
  const context = useContext(WaterContext);
  if (!context) {
    throw new Error('useWater must be used within a WaterProvider');
  }
  return context;
}; 