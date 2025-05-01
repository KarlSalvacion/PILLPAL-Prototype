import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopNavigationBar from '../components/TopNavigationBar';
import stylesNotification from '../styles/styles-screen/StylesNotificationScreen';

const NotificationScreen = ({ navigation }: any) => {
  return (
    <View style={stylesNotification.container}>
      <View style={stylesNotification.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#177581" />
        </Pressable>
        <Text style={stylesNotification.headerTitle}>Notifications</Text>
        
      </View>
      <View style={stylesNotification.content}>
        <Text style={stylesNotification.title}>Notifications</Text>
        {/* Add notification list here */}
      </View>
    </View>
  );
};

export default NotificationScreen; 