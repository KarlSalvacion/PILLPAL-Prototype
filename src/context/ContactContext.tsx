import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('emergencyContacts');
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const saveContacts = async (newContacts: Contact[]) => {
    try {
      await AsyncStorage.setItem('emergencyContacts', JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      id: Date.now().toString(),
      ...contact,
    };
    await saveContacts([...contacts, newContact]);
  };

  const removeContact = async (id: string) => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    await saveContacts(newContacts);
  };

  const updateContact = async (id: string, updatedContact: Omit<Contact, 'id'>) => {
    const newContacts = contacts.map(contact =>
      contact.id === id ? { ...contact, ...updatedContact } : contact
    );
    await saveContacts(newContacts);
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        removeContact,
        updateContact,
      }}
    >
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