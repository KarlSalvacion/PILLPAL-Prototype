import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, Pressable } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useMedicine } from '../context/MedicineContext';
import { useCalendar } from '../context/CalendarContext';
import { useSymptoms } from '../context/SymptomContext';
import { useWater } from '../context/WaterContext';
import stylesHomeScreen from '../styles/styles-screen/StylesHomeScreen';
import TopNavigationBar from '../components/TopNavigationBar';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HomeScreen = ({ navigation }: any) => {
  const { medicines } = useMedicine();
  const { trackedSymptoms } = useSymptoms();
  const { currentIntake, totalGoal, measurement, intakes } = useWater();
  const { date, selectedDay, handleNextDay, handlePrevDay, handleDayClick, formatSelectedDate } = useCalendar();
  const today = new Date();
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(true);
  const [calendarHeight] = useState(new Animated.Value(150));

  const toggleCalendar = () => {
    const toValue = isCalendarExpanded ? 0 : 150;
    Animated.timing(calendarHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsCalendarExpanded(!isCalendarExpanded);
  };

  // Force re-render when water intake changes
  useEffect(() => {
    console.log('Water intake updated:', currentIntake);
  }, [currentIntake, intakes]);

  // Memoize the water intake section to prevent unnecessary re-renders
  const renderWaterIntakeSection = useCallback(() => {
    // Only show water intake for current day
    const isCurrentDay = selectedDay?.toDateString() === today.toDateString();
    if (!isCurrentDay) return null;

    return (
      <View style={stylesHomeScreen.section}>
        <Text style={stylesHomeScreen.sectionTitle}>Water Intake Tracker</Text>
        <TouchableOpacity 
          style={stylesHomeScreen.waterIntakeContainer}
          onPress={() => navigation.navigate('Water')}
        >
          <View style={stylesHomeScreen.waterIntakeContent}>
            <View style={stylesHomeScreen.waterIntakeLeft}>
              <MaterialCommunityIcons name="cup-water" size={32} color="rgb(240, 240, 240)" />
              <View style={stylesHomeScreen.waterIntakeInfo}>
                <Text style={stylesHomeScreen.waterIntakeText}>
                  {currentIntake} / {totalGoal} {measurement}
                </Text>
                <Text style={stylesHomeScreen.waterIntakeSubtext}>
                  {Math.round((currentIntake / totalGoal) * 100)}% of daily goal
                </Text>
              </View>
            </View>
            <View style={stylesHomeScreen.waterIntakeRight}>
              <View style={stylesHomeScreen.waterProgressContainer}>
                <View 
                  style={[
                    stylesHomeScreen.waterProgressBar,
                    { width: `${Math.min(Math.round((currentIntake / totalGoal) * 100), 100)}%` }
                  ]} 
                />
              </View>
              <Feather name="chevron-right" size={24} color="rgb(240, 240, 240)" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }, [currentIntake, totalGoal, measurement, navigation, selectedDay, today]);

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

  const getLatestSymptoms = () => {
    if (!selectedDay) return [];
    
    return trackedSymptoms
      .filter(symptom => {
        const symptomDate = new Date(symptom.timestamp);
        const selectedDate = new Date(selectedDay);
        
        return symptomDate.getFullYear() === selectedDate.getFullYear() &&
               symptomDate.getMonth() === selectedDate.getMonth() &&
               symptomDate.getDate() === selectedDate.getDate();
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const latestSymptoms = getLatestSymptoms();

  return (
    <View style={stylesHomeScreen.mainContainer}>
      <TopNavigationBar 
        title="Home"
        navigation={navigation}
      />

      <Animated.View style={[stylesHomeScreen.calendarSection, { height: calendarHeight }]}>
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
      </Animated.View>

      <Pressable 
        style={({ pressed }) => [
          stylesHomeScreen.calendarToggle,
          !isCalendarExpanded && { backgroundColor: 'rgb(244, 254, 255)', borderBottomColor: 'rgb(238, 238, 238)' },
          pressed && { backgroundColor: isCalendarExpanded ? 'rgb(24, 108, 119)' : 'rgb(220, 240, 240)' }
        ]}
        onPress={toggleCalendar}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }}
      >
        <Feather 
          name={isCalendarExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          style={[stylesHomeScreen.calendarToggleIcon, 
            !isCalendarExpanded && { color: 'rgb(23, 117, 129)' }]}
        />
      </Pressable>

      <View style={stylesHomeScreen.contentSection}>
        <View style={stylesHomeScreen.selectedDateContainer}>
          <Text style={stylesHomeScreen.selectedDateText}>{formatSelectedDate(selectedDay)}</Text>
          <View style={stylesHomeScreen.horizontalLine}/>
        </View>

        <ScrollView style={stylesHomeScreen.medicineScrollView}>
          {selectedDayMedicines.length > 0 ? (
            <>
              <View style={stylesHomeScreen.medicineTextContainer}>
                <Text style={stylesHomeScreen.medicineText}>Your Medicine Intake is in:</Text>
              </View>
              {selectedDayMedicines.map((medicine) => (
                <TouchableOpacity 
                  key={medicine.id} 
                  style={stylesHomeScreen.medicineIntakeContainer}
                  onPress={() => navigation.navigate('Medicine')}
                >
                  <View style={stylesHomeScreen.medicineBox}>
                    <View style={stylesHomeScreen.leftSide}>
                      <MaterialCommunityIcons name="pill" style={stylesHomeScreen.pillIcon} />
                      <Text style={stylesHomeScreen.medicineName}>{medicine.name}</Text>
                      <Text style={stylesHomeScreen.medicineDetails}>
                       {medicine.dosage}
                      </Text>
                      <Text style={stylesHomeScreen.medicineDetails}>
                        {medicine.intakeMode.charAt(0).toUpperCase() + medicine.intakeMode.slice(1)} intake
                      </Text>
                      <Text style={stylesHomeScreen.medicineDetails}>
                        Quantity: {medicine.quantity || 1}
                      </Text>
                    </View>
                    <View style={stylesHomeScreen.verticalLine}></View>
                    <View style={stylesHomeScreen.rightSide}>
                      <Feather name="clock" style={stylesHomeScreen.clockIcon} />
                      <Text style={stylesHomeScreen.timeText}>{formatTime(medicine.nextReminder)}</Text>
                      {medicine.isRepeating && (
                        <>
                          <Text style={stylesHomeScreen.medicineDetails}>
                            {medicine.repeatCount} times per day
                          </Text>
                          <Text style={stylesHomeScreen.medicineDetails}>
                            Every {medicine.intervalHours} hours
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View style={stylesHomeScreen.section}>
              <View style={stylesHomeScreen.emptyMedicineContainer}>
                <MaterialCommunityIcons name="pill" size={32} color="rgb(23, 117, 129)" />
                <Text style={stylesHomeScreen.emptyMedicineText}>
                  No Medicines Scheduled
                </Text>
                <Text style={stylesHomeScreen.emptyMedicineSubtext}>
                  You have no medicines scheduled for {formatSelectedDate(selectedDay)}
                </Text>
                <TouchableOpacity 
                  style={stylesHomeScreen.addMedicineButton}
                  onPress={() => navigation.navigate('Medicine')}
                >
                  <Text style={stylesHomeScreen.addMedicineButtonText}>Schedule Medicine</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* LATEST SYMPTOMS SECTION */}
          {latestSymptoms.length > 0 ? (
            <View style={stylesHomeScreen.section}>
              <Text style={stylesHomeScreen.sectionTitle}>Latest Symptom Report</Text>
              {latestSymptoms.map((symptom) => (
                <TouchableOpacity 
                  key={symptom.id} 
                  style={stylesHomeScreen.symptomItem}
                  onPress={() => navigation.navigate('Symptoms')}
                >
                  <View style={stylesHomeScreen.symptomHeader}>
                    {symptom.isChecked ? (
                      <MaterialCommunityIcons name="check-circle" size={24} color="rgb(12, 66, 70)" />
                    ) : (
                      <MaterialCommunityIcons name="alert-circle" size={24} color="rgb(12, 66, 70)" />
                    )}
                    <Text style={stylesHomeScreen.symptomName}>{symptom.name}</Text>
                    {symptom.isChecked && (
                      <Text style={stylesHomeScreen.resolvedText}>Resolved</Text>
                    )}
                  </View>
                  {symptom.treatment && (
                    <Text style={stylesHomeScreen.symptomTreatment}>
                      Treatment: {symptom.treatment}
                    </Text>
                  )}
                  <Text style={stylesHomeScreen.symptomTime}>
                    Reported at: {new Date(symptom.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    })}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={stylesHomeScreen.section}>
              <View style={stylesHomeScreen.emptySymptomContainer}>
                <MaterialCommunityIcons name="check-circle-outline" size={32} color="rgb(23, 117, 129)" />
                <Text style={stylesHomeScreen.emptySymptomText}>
                  Feeling Good Today!
                </Text>
                <Text style={stylesHomeScreen.emptySymptomSubtext}>
                  No symptoms reported for {formatSelectedDate(selectedDay)}
                </Text>
                <TouchableOpacity 
                  style={stylesHomeScreen.addSymptomButton}
                  onPress={() => navigation.navigate('Symptoms')}
                >
                  <Text style={stylesHomeScreen.addSymptomButtonText}>Report a Symptom</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Water Intake Section */}
          {renderWaterIntakeSection()}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen; 