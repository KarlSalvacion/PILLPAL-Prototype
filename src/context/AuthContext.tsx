import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileService } from '../services/FileService';

interface AuthContextData {
  isAuthenticated: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await FileService.initialize();
      await loadStoredData();
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  };

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading stored data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const accounts = await FileService.readAccounts();
      const user = accounts.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      // Remove console.error and just throw the error
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to sign in');
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const accounts = await FileService.readAccounts();
      
      const existingUser = accounts.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: FileService.generateUUID(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      };

      accounts.push(newUser);
      await FileService.writeAccounts(accounts);
    } catch (error) {
      // Remove console.error and just throw the error
      // This prevents the error from showing in the Expo client
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to create account');
    }
  };

  const signOut = async () => {
    try {
      const userId = user?.id;
      await AsyncStorage.removeItem('@user');
      // Clear user-specific data
      await AsyncStorage.removeItem(`@water_tracker_data_${userId}`);
      await AsyncStorage.removeItem(`medicines_${userId}`);
      await AsyncStorage.removeItem(`trackedSymptoms_${userId}`);
      await AsyncStorage.removeItem(`notifications_${userId}`); // Add this line
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      // Remove console.error and just throw the error
      throw new Error('Failed to sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);