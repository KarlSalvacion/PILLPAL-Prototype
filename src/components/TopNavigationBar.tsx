import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import stylesTopNavigator from 'styles/styles-components/StylesTopNavigationBar';

interface TopNavigationBarProps {
  title: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onContactPress?: () => void;
}

const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
  title,
  onMenuPress,
  onNotificationPress,
  onContactPress,
}) => {
  return (
    <View style={stylesTopNavigator.topSection}>
      <View style={stylesTopNavigator.userContainer}>
        <View style={stylesTopNavigator.textContainer}>
          <Text style={stylesTopNavigator.welcomeText}>{title}</Text>
        </View>
      </View>

      <View style={stylesTopNavigator.iconContainer}>
        <Pressable onPress={onContactPress}>
          <Ionicons name="call" style={stylesTopNavigator.iconContact} />
        </Pressable>
        <Pressable onPress={onNotificationPress}>
          <Ionicons name="notifications" style={stylesTopNavigator.iconNotification} />
        </Pressable>
        <Pressable onPress={onMenuPress}>
          <Ionicons name="menu" style={stylesTopNavigator.burgerMenu} />
        </Pressable>
      </View>
    </View>
  );
};

export default TopNavigationBar; 