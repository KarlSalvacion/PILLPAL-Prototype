import { StyleSheet } from "react-native";

const stylesHomeScreen = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // CALENDAR SECTION
    calendarSection: {
        backgroundColor: '#177581',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    
    calendarToggle: {
        backgroundColor: 'rgb(23, 117, 129)',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(191, 214, 217)',
        marginTop: -24,
    },

    calendarToggleIcon: {
        color: 'rgb(247, 247, 247)',
        fontSize: 24,
    },
    
    calendarArea: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'center',
        paddingHorizontal: 60,
        paddingTop: 10,
    },

    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },

    monthText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'white',
    },

    calendarContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        marginTop: 0,
    },

    arrowIcon: {
        fontSize: 30,
        color: 'white',
        marginHorizontal: 10,
    },

    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    dayBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgb(244, 254, 255)',
        minWidth: 60,
        height: 70,
        color: 'white',
    },

    currentDayBox: {
        borderWidth: 3,
    },

    currentDayText: {
        color: 'white',
    },
    
    selectedDayBox: {
        backgroundColor: 'rgb(244, 254, 255)',
    },
    
    selectedDayText: {
        color: 'rgb(23, 117, 129)',
    },
    
    dayNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },

    dayLabel: {
        fontSize: 14,
        color: 'rgb(252, 255, 250)',
    },

    dayBoxWrapper: {
        alignItems: 'center',
    },
    
    dayBoxContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 70,
    },
    
    todayLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'rgb(235, 235, 235)',
        marginBottom: 5,
    },

    // CONTENTS SECTION
    contentSection: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedDateContainer: {
        borderRadius: 5,
        zIndex: 1,
        width: '100%',
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    
    selectedDateText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgb(23, 117, 129)',
    },
    
    horizontalLine: {
        width: '100%',
        marginVertical: 5,
        height: 1,
        backgroundColor: 'rgb(191, 214, 217)',
    },

    // MEDICINE SECTION
    medicineIntakeContainer: {
        width: '100%',
        padding: 0,
    },

    noMedicineIntakeContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },

    medicineScrollView: {
        width: '100%',
    },

    medicineText: {
        fontSize: 16,
        color: 'rgb(23, 117, 129)',
        fontWeight: 'bold',
        textAlign: 'left',
    },

    medicineTextContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
    },

    medicineBox: {
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgb(23, 117, 129)',
        padding: 20,
        borderRadius: 15,
        height: 140,
        shadowColor: 'rgb(23, 117, 129)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    leftSide: {
        flex: 1,
        justifyContent: 'center',
    },

    rightSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    pillIcon: {
        fontSize: 30,
        color: 'rgb(244, 254, 255)',
    },

    medicineName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(244, 254, 255)',
    },

    medicineDetails: {
        fontSize: 14,
        color: 'rgb(244, 254, 255)',
    },

    verticalLine: {
        width: 2,
        
        height: '100%',
        backgroundColor: 'rgb(92, 160, 167)',
    },

    clockIcon: {
        fontSize: 30,
        color: 'rgb(244, 254, 255)',
    },

    timeText: {
        fontSize: 16,
        color: 'rgb(244, 254, 255)',
    },

    // SYMPTOM SECTION
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(23, 117, 129)',
        marginBottom: 10,
    },
    symptomItem: {
        backgroundColor: 'rgb(232, 201, 108)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        shadowColor: 'rgb(23, 117, 129)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    symptomHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    symptomName: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgb(12, 66, 70)',
        marginLeft: 10,
    },
    symptomTreatment: {
        fontSize: 14,
        color: 'rgb(12, 66, 70)',
        marginBottom: 5,
    },
    symptomTime: {
        fontSize: 12,
        color: 'rgb(12, 66, 70)',
    },
    emptyState: {
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        fontSize: 14,
        color: 'rgb(12, 66, 70)',
        textAlign: 'center',
    },

    resolvedText: {
        fontSize: 14,
        color: 'rgb(12, 66, 70)',
        marginLeft: 'auto',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    // WATER INTAKE SECTION
    waterIntakeContainer: {
        backgroundColor: 'rgb(46, 108, 173)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        shadowColor: 'rgb(23, 117, 129)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    waterIntakeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    waterIntakeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    waterIntakeRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    waterIntakeInfo: {
        marginLeft: 15,
    },
    waterIntakeText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgb(240, 240, 240)',
    },
    waterIntakeSubtext: {
        fontSize: 14,
        color: 'rgb(240, 240, 240)',
        marginTop: 4,
    },
    waterProgressContainer: {
        width: 100,
        height: 6,
        backgroundColor: 'rgba(240, 240, 240, 0.3)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    waterProgressBar: {
        height: '100%',
        backgroundColor: 'rgb(240, 240, 240)',
        borderRadius: 3,
    },

    // Empty Symptom State
    emptySymptomContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 0,
        borderColor: 'rgba(198, 198, 198, 0.4)',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
        // shadowColor: 'rgb(23, 117, 129)',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        // elevation: 3,
    },
    emptySymptomText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(23, 117, 129)',
        marginTop: 10,
        marginBottom: 5,
    },
    emptySymptomSubtext: {
        fontSize: 14,
        color: 'rgb(92, 160, 167)',
        textAlign: 'center',
        marginBottom: 15,
    },
    addSymptomButton: {
        backgroundColor: 'rgb(23, 117, 129)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 5,
    },
    addSymptomButtonText: {
        color: 'rgb(244, 254, 255)',
        fontSize: 14,
        fontWeight: '600',
    },

    // Empty Medicine State
    emptyMedicineContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 0,
        borderColor: 'rgba(198, 198, 198, 0.4)',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
     
    },
    emptyMedicineText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(23, 117, 129)',
        marginTop: 10,
        marginBottom: 5,
    },
    emptyMedicineSubtext: {
        fontSize: 14,
        color: 'rgb(92, 160, 167)',
        textAlign: 'center',
        marginBottom: 15,
    },
    addMedicineButton: {
        backgroundColor: 'rgb(23, 117, 129)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 5,
    },
    addMedicineButtonText: {
        color: 'rgb(244, 254, 255)',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default stylesHomeScreen;
