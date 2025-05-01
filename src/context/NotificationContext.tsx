import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationContextType {
  scheduleNotification: (medicine: any) => Promise<string | undefined>;
  cancelNotification: (notificationId: string) => Promise<void>;
  requestPermissions: () => Promise<boolean>;
  rescheduleNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    await requestPermissions();
    await rescheduleNotifications();
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    return status === 'granted';
  };

  const scheduleNotification = async (medicine: any) => {
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    const { name, dosage, intakeTime, repeatCount, intervalHours } = medicine;
    const reminderTime = new Date(intakeTime);
    const now = new Date();
    
    // If the reminder time is in the past, set it to tomorrow
    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    // Schedule initial notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medicine Reminder',
        body: `Time to take ${name} (${dosage})`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        type: 'date',
        date: reminderTime,
        repeats: repeatCount > 1,
      } as Notifications.NotificationTriggerInput,
    });

    // If medicine repeats, schedule additional notifications
    if (repeatCount > 1 && intervalHours) {
      for (let i = 1; i < repeatCount; i++) {
        const nextTime = new Date(reminderTime);
        nextTime.setHours(nextTime.getHours() + (intervalHours * i));
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Medicine Reminder',
            body: `Time to take ${name} (${dosage})`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: {
            type: 'date',
            date: nextTime,
            repeats: false,
          } as Notifications.NotificationTriggerInput,
        });
      }
    }

    // Store notification data
    const notificationData = {
      id: notificationId,
      medicineId: medicine.id,
      time: reminderTime.toISOString(),
      repeatCount,
      intervalHours,
    };

    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    notifications.push(notificationData);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

    return notificationId;
  };

  const cancelNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    
    // Remove from storage
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      const updatedNotifications = notifications.filter((n: any) => n.id !== notificationId);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    }
  };

  const rescheduleNotifications = async () => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      for (const notification of notifications) {
        const time = new Date(notification.time);
        if (time > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Medicine Reminder',
              body: `Time to take medicine`,
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: {
              type: 'date',
              date: time,
              repeats: notification.repeatCount > 1,
            } as Notifications.NotificationTriggerInput,
          });
        }
      }
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      scheduleNotification, 
      cancelNotification, 
      requestPermissions,
      rescheduleNotifications 
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}; 