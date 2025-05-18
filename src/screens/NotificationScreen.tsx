import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, FlatList, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import stylesNotification from '../styles/styles-screen/StylesNotificationScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  isTriggered?: boolean;
}

const NotificationScreen = ({ navigation }: any) => {
  const { notifications = [], cancelNotification } = useNotification() as unknown as { notifications: Notification[], cancelNotification: (id: string) => Promise<void> };
  const { user } = useAuth();
  const [localNotifications, setLocalNotifications] = useState<Notification[]>([]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem(`notifications_${user?.id}`);
        if (storedNotifications) {
          const parsedNotifications = JSON.parse(storedNotifications);
          // Sort notifications by time, most recent first
          const sortedNotifications = parsedNotifications.sort((a: Notification, b: Notification) => 
            new Date(b.time).getTime() - new Date(a.time).getTime()
          );
          setLocalNotifications(sortedNotifications);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();
  }, [user?.id, notifications]);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
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
              // Update local notifications after deletion
              setLocalNotifications(prev => prev.filter(n => n.id !== id));
            } catch (error) {
              console.error('Error deleting notification:', error);
              Alert.alert('Error', 'Failed to delete notification. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      'Delete All Notifications',
      'Are you sure you want to delete all notifications? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete all notifications from AsyncStorage
              await AsyncStorage.removeItem(`notifications_${user?.id}`);
              // Clear local state
              setLocalNotifications([]);
              // Cancel all scheduled notifications
              for (const notification of localNotifications) {
                if (!notification.isTaken && !notification.isTriggered) {
                  await cancelNotification(notification.id);
                }
              }
            } catch (error) {
              console.error('Error deleting all notifications:', error);
              Alert.alert('Error', 'Failed to delete all notifications. Please try again.');
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
    const isTriggeredNotification = item.id.includes('_triggered_');
    const originalNotification = isTakenNotification 
      ? notifications.find(n => n.id === item.id.split('_taken_')[0])
      : null;

    return (
      <View style={[
        stylesNotification.notificationItem,
        item.isTaken && stylesNotification.takenItem,
        isTriggeredNotification && stylesNotification.triggeredItem,
      ]}>
        <View style={stylesNotification.notificationContent}>
          <View style={stylesNotification.notificationHeader}>
            <Text style={stylesNotification.notificationTitle}>
              {item.isTaken ? 'Medicine Taken' : 
               isTriggeredNotification ? 'Reminder Sent' : 
               'Medicine Reminder'}
            </Text>
            {item.isTaken && (
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            )}
            {isTriggeredNotification && (
              <MaterialCommunityIcons name="bell-ring" size={20} color="#177581" />
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
            {item.isTaken ? 'Taken at: ' : 
             isTriggeredNotification ? 'Reminder sent at: ' :
             'Scheduled for: '}
            {formatTime(item.isTaken ? item.takenAt! : item.time)}
          </Text>
          {!item.isTaken && !isTriggeredNotification && item.repeatCount > 1 && (
            <Text style={stylesNotification.repeatInfo}>
              Repeats {item.repeatCount} times every {item.intervalHours} hours
            </Text>
          )}
        </View>
        <Pressable 
          style={stylesNotification.deleteButton}
          onPress={() => handleDelete(item.id)}>
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
      <Pressable 
        style={stylesNotification.header}
        onPress={scrollToTop}>
        <View style={stylesNotification.headerLeft}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#177581" />
          </Pressable>
          <Text style={stylesNotification.headerTitle}>Notifications</Text>
        </View>
        <View style={stylesNotification.deleteAllContainer}>
          <TouchableOpacity 
            style={stylesNotification.deleteAllButton}
            onPress={handleDeleteAll}>
            <Text style={stylesNotification.deleteAllText}>Delete All</Text>
            <MaterialCommunityIcons name="trash-can-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Pressable>
      <View style={stylesNotification.content}>
        <FlatList
          ref={flatListRef}
          data={localNotifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
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