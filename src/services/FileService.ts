import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCOUNTS_KEY = '@accounts';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export const FileService = {
  async initialize() {
    try {
      const accounts = await AsyncStorage.getItem(ACCOUNTS_KEY);
      if (!accounts) {
        await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error initializing file service:', error);
      throw error;
    }
  },

  async readAccounts(): Promise<User[]> {
    try {
      const accounts = await AsyncStorage.getItem(ACCOUNTS_KEY);
      return accounts ? JSON.parse(accounts) : [];
    } catch (error) {
      console.error('Error reading accounts:', error);
      throw error;
    }
  },

  async writeAccounts(accounts: User[]): Promise<void> {
    try {
      await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (error) {
      console.error('Error writing accounts:', error);
      throw error;
    }
  },

  generateUUID(): string {
    // Generate a UUID using a combination of timestamp and random numbers
    const timestamp = new Date().getTime();
    const randomPart = Math.floor(Math.random() * 1000000);
    const uuid = `${timestamp}-${randomPart}-${Math.random().toString(36).substr(2, 9)}`;
    return uuid;
  }
};