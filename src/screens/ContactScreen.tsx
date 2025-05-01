import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import stylesContact from '../styles/styles-screen/StylesContactScreen';

const ContactScreen = ({ navigation }: any) => {
  return (
    <View style={stylesContact.container}>
      <View style={stylesContact.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#177581" />
        </Pressable>
        <Text style={stylesContact.headerTitle}>Emergency Contacts</Text>
      </View>
      <View style={stylesContact.content}>
        <Text style={stylesContact.title}>Emergency Contacts</Text>
        <View style={stylesContact.contactContainer}>
          <Text>Emergency Contacts</Text>
          <Text>Emergency Contacts</Text>
          <Text>Emergency Contacts</Text>
          <Text>Emergency Contacts</Text>
          <Text>Emergency Contacts</Text>
        </View>
      </View>
    </View>
  );
};

export default ContactScreen; 