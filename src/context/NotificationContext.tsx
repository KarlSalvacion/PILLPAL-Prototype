import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  scheduleNotification: (medicine: any) => Promise<string | undefined>;
  cancelNotification: (notificationId: string) => Promise<void>;
  requestPermissions: () => Promise<boolean>;
  rescheduleNotifications: () => Promise<void>;
  markMedicineAsTaken: (medicineId: string, notificationId: string) => Promise<void>;
}

interface Notification {
  id: string;
  medicineId?: string;
  medicineName?: string;
  dosage?: string;
  time: string;
  repeatCount: number;
  intervalHours?: number;
  isTaken: boolean;
  takenAt?: string;
  isTriggered?: boolean;
  type?: 'medicine' | 'symptom' | 'symptom_resolved';
  name?: string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

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
  const { user } = useAuth();
  const STORAGE_KEY = `notifications_${user?.id}`;

  useEffect(() => {
    if (user?.id) {
      setupNotifications();
    }
  }, [user?.id]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      console.log('Notification received:', notification);
      try {
        const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
        const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
        
        const triggeredNotification = notifications.find((n: Notification) => 
          n.id === notification.request.identifier || 
          notification.request.identifier.startsWith(n.id)
        );
        
        console.log('Found triggered notification:', triggeredNotification);
        
        if (triggeredNotification) {
          const triggeredEntry: Notification = {
            ...triggeredNotification,
            id: `${triggeredNotification.id}_triggered_${Date.now()}`,
            time: new Date().toISOString(),
            isTriggered: true
          };
          
          console.log('Adding triggered entry:', triggeredEntry); 
          
          notifications.push(triggeredEntry);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        }
      } catch (error) {
        console.error('Error handling notification received:', error);
      }
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      console.log('Notification response received:', response); 
      try {
        const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
        const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
        
        const triggeredNotification = notifications.find((n: Notification) => 
          n.id === response.notification.request.identifier || 
          response.notification.request.identifier.startsWith(n.id)
        );
        
        if (triggeredNotification) {
          const triggeredEntry: Notification = {
            ...triggeredNotification,
            id: `${triggeredNotification.id}_triggered_${Date.now()}`,
            time: new Date().toISOString(),
            isTriggered: true
          };
          
          notifications.push(triggeredEntry);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        }
      } catch (error) {
        console.error('Error handling notification response:', error);
      }
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, [user?.id]);

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

    const { name, dosage, intakeTime, repeatCount, intervalHours, type = 'medicine', id } = medicine;
    const now = new Date();
    const baseTime = new Date(intakeTime || now);
    
    // Ensure we're working with exact timestamps
    baseTime.setSeconds(0, 0);
    
    // If the base time is in the past, set it to tomorrow at the same time
    if (baseTime < now) {
      baseTime.setDate(baseTime.getDate() + 1);
    }

    let notificationContent;
    if (type === 'symptom') {
      notificationContent = {
        title: 'Symptom Check-in',
        body: `Time to check on your ${name} symptom`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      };
    } else if (type === 'symptom_resolved') {
      notificationContent = {
        title: 'Symptom Resolved',
        body: `Your ${name} symptom has been marked as resolved`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      };
    } else {
      notificationContent = {
        title: 'Medicine Reminder',
        body: `Time to take ${name} (${dosage})`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      };
    }

    // Schedule notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        type: 'date',
        date: baseTime,
        repeats: repeatCount > 1,
        channelId: 'default',
      } as Notifications.NotificationTriggerInput,
    });

    // Store notification data
    const notificationData: Notification = {
      id: notificationId,
      medicineId: id,
      medicineName: name,
      dosage: dosage,
      time: baseTime.toISOString(),
      repeatCount,
      intervalHours,
      isTaken: false,
      type,
    };

    const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];
    notifications.push(notificationData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));

    return notificationId;
  };

  const markMedicineAsTaken = async (medicineId: string, notificationId: string) => {
    try {
      const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
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
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));

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
    
    const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      const updatedNotifications = notifications.filter((n: Notification) => n.id !== notificationId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotifications));
    }
  };

  const rescheduleNotifications = async () => {
    const storedNotifications = await AsyncStorage.getItem(STORAGE_KEY);
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