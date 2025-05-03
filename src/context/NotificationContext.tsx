import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationContextType {
  scheduleNotification: (medicine: any) => Promise<string | undefined>;
  cancelNotification: (notificationId: string) => Promise<void>;
  requestPermissions: () => Promise<boolean>;
  rescheduleNotifications: () => Promise<void>;
  markMedicineAsTaken: (medicineId: string, notificationId: string) => Promise<void>;
}

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

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
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
    const now = new Date();
    const baseTime = new Date(intakeTime);
    
    // Ensure we're working with exact timestamps
    baseTime.setSeconds(0, 0); // Set seconds and milliseconds to 0 for precise timing
    
    // If the base time is in the past, set it to tomorrow at the same time
    if (baseTime < now) {
      baseTime.setDate(baseTime.getDate() + 1);
    }

    // Schedule all notifications at once
    const notificationPromises: Promise<string>[] = [];

    // Schedule initial notification
    notificationPromises.push(
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Medicine Reminder',
          body: `Time to take ${name} (${dosage})`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: 'date',
          date: baseTime,
          repeats: repeatCount > 1,
          channelId: 'default',
        } as Notifications.NotificationTriggerInput,
      })
    );

    // If medicine repeats, schedule additional notifications
    if (repeatCount > 1 && intervalHours) {
      for (let i = 1; i < repeatCount; i++) {
        const nextTime = new Date(baseTime);
        nextTime.setHours(nextTime.getHours() + (intervalHours * i));
        nextTime.setSeconds(0, 0); // Ensure precise timing for repeated notifications
        
        notificationPromises.push(
          Notifications.scheduleNotificationAsync({
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
              channelId: 'default',
            } as Notifications.NotificationTriggerInput,
          })
        );
      }
    }

    // Wait for all notifications to be scheduled
    const notificationIds = await Promise.all(notificationPromises);

    // Store notification data
    const notificationData: Notification = {
      id: notificationIds[0], // Store the first notification ID as the primary one
      medicineId: medicine.id,
      medicineName: name,
      dosage: dosage,
      time: baseTime.toISOString(),
      repeatCount,
      intervalHours,
      isTaken: false
    };

    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    notifications.push(notificationData);
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

    return notificationIds[0];
  };

  const markMedicineAsTaken = async (medicineId: string, notificationId: string) => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        const notifications = JSON.parse(storedNotifications);
        const originalNotification = notifications.find((n: Notification) => n.id === notificationId);
        
        if (originalNotification) {
          // Create a new taken notification
          const takenNotification: Notification = {
            id: `${notificationId}_taken_${Date.now()}`, // Unique ID for the taken notification
            medicineId: originalNotification.medicineId,
            medicineName: originalNotification.medicineName,
            dosage: originalNotification.dosage,
            time: new Date().toISOString(),
            repeatCount: 1,
            intervalHours: 0,
            isTaken: true,
            takenAt: new Date().toISOString()
          };

          // Add the new taken notification to the list
          notifications.push(takenNotification);
          await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

          // Schedule a confirmation notification
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Medicine Taken',
              body: `You have successfully taken ${originalNotification.medicineName} (${originalNotification.dosage})`,
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Show immediately
          });
        }
      }
    } catch (error) {
      console.error('Error marking medicine as taken:', error);
    }
  };

  const cancelNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    
    // Remove from storage
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      const updatedNotifications = notifications.filter((n: Notification) => n.id !== notificationId);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    }
  };

  const rescheduleNotifications = async () => {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      for (const notification of notifications) {
        const time = new Date(notification.time);
        if (time > new Date() && !notification.isTaken) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Medicine Reminder',
              body: `Time to take ${notification.medicineName} (${notification.dosage})`,
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
      rescheduleNotifications,
      markMedicineAsTaken
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