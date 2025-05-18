import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  updateProfile, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase'; // <-- Ensure this file exports the Firebase auth instance

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
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          setIsAuthenticated(true);
          await AsyncStorage.setItem('@user', JSON.stringify(firebaseUser));
        } else {
          setUser(null);
          setIsAuthenticated(false);
          await AsyncStorage.removeItem('@user');
        }
      });

      return () => unsubscribe();
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
      await signInWithEmailAndPassword(auth, email, password);
      // No need to manually set user here — onAuthStateChanged will handle it
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // No need to manually set user — onAuthStateChanged will handle it
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      await AsyncStorage.removeItem('@user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
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
