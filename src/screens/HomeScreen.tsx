import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMedicine } from '../context/MedicineContext';
import { useCalendar } from '../context/CalendarContext';
import stylesHomeScreen from '../styles/styles-screen/StylesHomeScreen';
import TopNavigationBar from '../components/TopNavigationBar';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HomeScreen = ({ navigation }: any) => {
  const { medicines } = useMedicine();
  const { date, selectedDay, handleNextDay, handlePrevDay, handleDayClick, formatSelectedDate } = useCalendar();
  const today = new Date();

  const getMedicinesForSelectedDay = () => {
    if (!selectedDay) return [];
    
    return medicines.filter(medicine => {
      const medicineDate = new Date(medicine.nextReminder);
      const selectedDate = new Date(selectedDay);
      
      return medicine.isActive && 
             medicineDate.getFullYear() === selectedDate.getFullYear() &&
             medicineDate.getMonth() === selectedDate.getMonth() &&
             medicineDate.getDate() === selectedDate.getDate();
    });
  };

  const selectedDayMedicines = getMedicinesForSelectedDay();

  // Format time for display
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <View style={stylesHomeScreen.mainContainer}>
      <TopNavigationBar 
        title="Home"
        navigation={navigation}
      />

      <View style={stylesHomeScreen.calendarSection}>
        <View style={stylesHomeScreen.calendarArea}>
          <TouchableOpacity onPress={handlePrevDay}>
            <Feather name="chevron-left" style={stylesHomeScreen.arrowIcon} />
          </TouchableOpacity>

          <View style={stylesHomeScreen.calendarContainer}>
            <View style={stylesHomeScreen.calendarHeader}>
              <Text style={stylesHomeScreen.monthText}>
                {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
              </Text>
            </View>

            <View style={stylesHomeScreen.dayContainer}>
              {Array.from({ length: 5 }).map((_, index) => {
                const dayDate = new Date(date);
                dayDate.setDate(date.getDate() - 2 + index);

                const isCurrentDay = dayDate.toDateString() === today.toDateString();
                const isSelectedDay = selectedDay?.toDateString() === dayDate.toDateString();

                return (
                  <TouchableOpacity key={index} onPress={() => handleDayClick(dayDate)}>
                    <View style={stylesHomeScreen.dayBoxWrapper}>
                      <View style={stylesHomeScreen.dayBoxContainer}>
                        {isCurrentDay && <Text style={stylesHomeScreen.todayLabel}>Today</Text>}

                        <View
                          style={[
                            stylesHomeScreen.dayBox,
                            isCurrentDay && stylesHomeScreen.currentDayBox,
                            isSelectedDay && stylesHomeScreen.selectedDayBox,
                          ]}
                        >
                          <Text
                            style={[
                              stylesHomeScreen.dayNumber,
                              isSelectedDay && stylesHomeScreen.selectedDayText,
                            ]}
                          >
                            {dayDate.getDate()}
                          </Text>

                          <Text
                            style={[
                              stylesHomeScreen.dayLabel,
                              isCurrentDay && stylesHomeScreen.currentDayText,
                              isSelectedDay && stylesHomeScreen.selectedDayText,
                            ]}
                          >
                            {daysOfWeek[dayDate.getDay()]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity onPress={handleNextDay}>
            <Feather name="chevron-right" style={stylesHomeScreen.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENTS SECTION */}
      <View style={stylesHomeScreen.contentSection}>
        <View style={stylesHomeScreen.selectedDateContainer}>
          <Text style={stylesHomeScreen.selectedDateText}>{formatSelectedDate(selectedDay)}</Text>
          <View style={stylesHomeScreen.horizontalLine}/>
        </View>

        {/* MEDICINE SECTION */}
        <ScrollView style={stylesHomeScreen.medicineScrollView}>
          {selectedDayMedicines.length > 0 ? (
            selectedDayMedicines.map((medicine) => (
              <View key={medicine.id} style={stylesHomeScreen.medicineIntakeContainer}>
                <Text style={stylesHomeScreen.medicineText}>Your Medicine Intake is in:</Text>
                <View style={stylesHomeScreen.medicineBox}>
                  <View style={stylesHomeScreen.leftSide}>
                    <MaterialCommunityIcons name="pill" style={stylesHomeScreen.pillIcon} />
                    <Text style={stylesHomeScreen.medicineName}>{medicine.name}</Text>
                    <Text style={stylesHomeScreen.medicineDetails}>
                      Dosage: {medicine.dosage}
                    </Text>
                    <Text style={stylesHomeScreen.medicineDetails}>
                      Mode: {medicine.intakeMode}
                    </Text>
                  </View>
                  <View style={stylesHomeScreen.verticalLine}></View>
                  <View style={stylesHomeScreen.rightSide}>
                    <Feather name="clock" style={stylesHomeScreen.clockIcon} />
                    <Text style={stylesHomeScreen.timeText}>{formatTime(medicine.nextReminder)}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={stylesHomeScreen.medicineIntakeContainer}>
              <Text style={stylesHomeScreen.medicineText}>No medicines scheduled for this day</Text>
            </View>
          )}
        </ScrollView>

      </View>
    </View>
  );
};

export default HomeScreen; 