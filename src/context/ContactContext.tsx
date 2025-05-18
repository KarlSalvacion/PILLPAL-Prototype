import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export interface Contact {
  id: string;
  name: string;
  relationship: string;
  email: string;
  phone: string;
}

interface ContactContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
  updateContact: (id: string, contact: Omit<Contact, 'id'>) => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const STORAGE_KEY = `emergencyContacts_${user?.id}`;
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadContacts();
    } else {
      setContacts([]); // Clear contacts when no user is logged in
    }
  }, [user?.id]); // Reload when user changes

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const saveContacts = async (newContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    await saveContacts([...contacts, newContact]);
  };

  const removeContact = async (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    await saveContacts(updatedContacts);
  };

  const updateContact = async (id: string, contact: Omit<Contact, 'id'>) => {
    const updatedContacts = contacts.map(existingContact => {
      if (existingContact.id === id) {
        return { ...contact, id };
      }
      return existingContact;
    });
    await saveContacts(updatedContacts);
  };

  return (
    <ContactContext.Provider value={{
      contacts,
      addContact,
      removeContact,
      updateContact,
    }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};