import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext'; // Add this import
import stylesNotification from '../styles/styles-screen/StylesNotificationScreen';

interface Notification {
  id: string;
  medicineId: string;
  medicineName: string;
  dosage: string;
  time: string;
  repeatCount: number;
  intervalHours: number;
  isTaken: boolean;
  takenAt?: string;
}

const NotificationScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { cancelNotification } = useNotification();
  const { user } = useAuth(); // Add this

  const STORAGE_KEY = `notifications_${user?.id}`; // Add this

  useEffect(() => {
    loadNotifications();
  }, [user?.id]); // Add user?.id as dependency

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        const sortedNotifications = parsedNotifications.sort((a: Notification, b: Notification) => {
          if (a.isTaken === b.isTaken) {
            return new Date(b.time).getTime() - new Date(a.time).getTime();
          }
          return a.isTaken ? 1 : -1;
        });
        setNotifications(sortedNotifications);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelNotification(id);
              const updatedNotifications = notifications.filter(
                notification => notification.id !== id
              );
              setNotifications(updatedNotifications);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
            } catch (error) {
              console.error('Error deleting notification:', error);
              Alert.alert('Error', 'Failed to delete notification. Please try again.');
            }
          },
        },
      ]
    );
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => {
    const isTakenNotification = item.id.includes('_taken_');
    const originalNotification = isTakenNotification 
      ? notifications.find(n => n.id === item.id.split('_taken_')[0])
      : null;

    return (
      <View style={[
        stylesNotification.notificationItem,
        item.isTaken && stylesNotification.takenItem,
      ]}>
        <View style={stylesNotification.notificationContent}>
          <View style={stylesNotification.notificationHeader}>
            <Text style={stylesNotification.notificationTitle}>
              {item.isTaken ? 'Medicine Taken' : 'Medicine Reminder'}
            </Text>
            {item.isTaken && (
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            )}
          </View>
          <Text style={stylesNotification.medicineName}>{item.medicineName}</Text>
          <Text style={stylesNotification.dosage}>Dosage: {item.dosage}</Text>
          {isTakenNotification && originalNotification && (
            <Text style={stylesNotification.originalTime}>
              Originally scheduled for: {formatTime(originalNotification.time)}
            </Text>
          )}
          <Text style={stylesNotification.notificationTime}>
            {item.isTaken ? 'Taken at: ' : 'Scheduled for: '}
            {formatTime(item.isTaken ? item.takenAt! : item.time)}
          </Text>
          {!item.isTaken && item.repeatCount > 1 && (
            <Text style={stylesNotification.repeatInfo}>
              Repeats {item.repeatCount} times every {item.intervalHours} hours
            </Text>
          )}
        </View>
        <Pressable onPress={() => handleDelete(item.id)}>
          <MaterialCommunityIcons 
            name="trash-can-outline" 
            size={24} 
            color="#177581"
            style={stylesNotification.trashIcon}
          />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={stylesNotification.container}>
      <View style={stylesNotification.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#177581" />
        </Pressable>
        <Text style={stylesNotification.headerTitle}>Notifications</Text>
      </View>
      <View style={stylesNotification.content}>
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={stylesNotification.emptyState}>
              <Text style={stylesNotification.emptyStateText}>
                No notifications yet
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default NotificationScreen;