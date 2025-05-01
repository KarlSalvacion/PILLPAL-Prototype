import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Pressable, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import stylesSideMenu from '../styles/styles-components/StylesSideMenu';
import { useAuth } from '../context/AuthContext';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

type IconName = 'home-outline' | 'pill' | 'calendar-outline' | 'account-outline' | 'cog-outline' | 'exit-to-app';

interface MenuItem {
  icon: IconName;
  label: string;
  screen: string;
}

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, navigation }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const { signOut } = useAuth();

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible]);

  const menuItems: MenuItem[] = [
    { icon: 'home-outline', label: 'Home', screen: 'Home' },
    { icon: 'pill', label: 'Medicines', screen: 'AddMedicine' },
    { icon: 'calendar-outline', label: 'Schedule', screen: 'Home' },
    { icon: 'account-outline', label: 'Profile', screen: 'Home' },
    { icon: 'cog-outline', label: 'Settings', screen: 'Home' },
    { icon: 'exit-to-app', label: 'Log-out', screen: 'Home' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={stylesSideMenu.modalContainer}>
          <TouchableWithoutFeedback>
            <Animated.View 
              style={[
                stylesSideMenu.menuContainer,
                {
                  transform: [{
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0]
                    })
                  }]
                }
              ]}
            >
              <View style={stylesSideMenu.header}>
                <Text style={stylesSideMenu.headerTitle}>Menu</Text>
                <Pressable onPress={onClose}>
                  <MaterialCommunityIcons name="close" size={24} color="#177581" />
                </Pressable>
              </View>
              
              {menuItems.map((item, index) => (
                <Pressable
                  key={index}
                  style={stylesSideMenu.menuItem}
                  onPress={() => {
                    if (item.label === 'Log-out') {
                      handleLogout();
                    } else {
                      navigation.navigate(item.screen);
                      onClose();
                    }
                  }}
                >
                  <MaterialCommunityIcons name={item.icon} size={24} color="#177581" />
                  <Text style={stylesSideMenu.menuItemText}>{item.label}</Text>
                </Pressable>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SideMenu; 