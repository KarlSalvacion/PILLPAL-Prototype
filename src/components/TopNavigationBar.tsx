import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import SideMenu from './SideMenu';
import stylesTopNavigator from '../styles/styles-components/StylesTopNavigationBar';
import { useAuth } from '../context/AuthContext';

interface TopNavigationBarProps {
  title: string;
  navigation: any;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onContactPress?: () => void;
}

const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
  title,
  navigation,
  onMenuPress,
  onNotificationPress,
  onContactPress,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <View style={stylesTopNavigator.topSection}>
        <View style={stylesTopNavigator.userContainer}>
          <View style={stylesTopNavigator.textContainer}>
            <Text style={stylesTopNavigator.welcomeText}>Welcome, {user?.name || 'User'}</Text>
          </View>
        </View>

        <View style={stylesTopNavigator.iconContainer}>
          <TouchableOpacity onPress={onContactPress || (() => navigation.navigate('Contacts'))}>
            <MaterialIcons name="contact-emergency" style={stylesTopNavigator.iconContact} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNotificationPress || (() => navigation.navigate('Notifications'))}>
            <Ionicons name="notifications" style={stylesTopNavigator.iconNotification} />
          </TouchableOpacity>
          <Pressable onPress={onMenuPress || (() => setIsMenuVisible(true))}>
            <Ionicons name="menu" style={stylesTopNavigator.burgerMenu} />
          </Pressable>
        </View>
      </View>

      <SideMenu
        visible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
        navigation={navigation}
      />
    </>
  );
};

export default TopNavigationBar; 