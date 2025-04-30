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
    },
    
    calendarArea: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'center',
        paddingHorizontal: 60,
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
        backgroundColor: 'rgb(244, 254, 255)',
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
        marginTop: 5,
        height: 1,
        backgroundColor: 'rgb(191, 214, 217)',
    },

    // MEDICINE SECTION
    medicineIntakeContainer: {
        width: '100%',
        padding: 20,
    },

    medicineScrollView: {
        width: '100%',
    },

    medicineText: {
        fontSize: 16,
        color: 'rgb(23, 117, 129)',
        fontWeight: 'bold',
        marginBottom: 10,
    },

    medicineBox: {
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
        marginRight: -100,
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
});

export default stylesHomeScreen;
