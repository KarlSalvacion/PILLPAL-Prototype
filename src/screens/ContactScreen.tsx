import React from 'react';
import { View, Text, Pressable, FlatList, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContacts, Contact } from '../context/ContactContext';
import stylesContact from '../styles/styles-screen/StylesContactScreen';

const ContactScreen = ({ navigation }: any) => {
  const { contacts, removeContact } = useContacts();

  const handleDeleteContact = (contact: Contact) => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${contact.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removeContact(contact.id),
        },
      ],
    );
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <View style={stylesContact.contactItem}>
      <View style={stylesContact.contactInfo}>
        <View>
          <Text style={stylesContact.contactName}>{item.name}</Text>
          <Text style={stylesContact.contactRelationship}>{item.relationship}</Text>
        </View>
        <View style={stylesContact.controlsSection}>
          <TouchableOpacity
            style={stylesContact.editButton}
          >
            <MaterialCommunityIcons name="pencil" size={24} color="#177581" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={stylesContact.deleteButton}
            onPress={() => handleDeleteContact(item)}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="#177581" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={stylesContact.contactDetails}>
        <View style={{flexDirection: 'column'}}>
          <Text style={stylesContact.contactDetail}>Email: {item.email}</Text>
          <Text style={stylesContact.contactDetail}>Phone: {item.phone}</Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity
            style={stylesContact.callButton}
            onPress={() => {}}
          >
            <MaterialCommunityIcons name="phone" size={24} color="#fff" />
            <Text style={stylesContact.callButtonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={stylesContact.container}>
      <View style={stylesContact.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#177581" />
        </Pressable>
        <Text style={stylesContact.headerTitle}>Emergency Contacts</Text>
      </View>
      <View style={stylesContact.content}>
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={stylesContact.emptyState}>
              <Text style={stylesContact.emptyStateText}>
                No emergency contacts added yet
              </Text>
            </View>
          }
        />
      </View>
      <View style={stylesContact.footer}>
        <Pressable 
          style={stylesContact.addButton}
          onPress={() => navigation.navigate('AddContact')}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#FFFFFF" />
          <Text style={stylesContact.addButtonText}>Add Emergency Contact</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ContactScreen; 