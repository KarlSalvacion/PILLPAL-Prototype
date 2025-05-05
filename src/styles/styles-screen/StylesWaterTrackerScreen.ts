import { StyleSheet } from "react-native";

const stylesWaterTracker = StyleSheet.create({
  // Main Container
  container: { 
    flex: 1, 
    alignItems: "center", 
    backgroundColor: "#f6f6f6", 
  },

  header: {
    backgroundColor: '#fff',
    padding: 16,
    width: '100%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  
  // Titles and Text
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#177581" 
  },
  trackerText: { 
    color: "rgb(255, 255, 255)", 
    fontWeight: "bold" 
  },
  goalTime: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#000" 
  },
  goalDetails: { 
    color: "#6c6c6c", 
    marginBottom: 10 
  },
  waterText: { 
    fontSize: 48, 
    color: "#165c59", 
    fontWeight: "bold" 
  },
  goalText: { 
    fontSize: 18, 
    color: "#6c6c6c" 
  },

  // Goal Card
  goalCard: { 
    backgroundColor: "#d1ebeb", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center", 
    marginBottom: 20 
  },

  // Toggle Buttons
  toggleContainer: { 
    flexDirection: "row", 
    marginTop: 40,
    marginBottom: 20 
  },
  toggleButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "#165c59", 
    marginHorizontal: 5 
  },
  toggleButtonSelected: { 
    backgroundColor: "#165c59", 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    marginHorizontal: 5 
  },
  toggleText: { 
    color: "#165c59", 
    fontWeight: "bold" 
  },

  // Buttons
  addGoalButton: { 
    backgroundColor: "#165c59", 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 20 
  },
  addGoalText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  addButton: { 
    backgroundColor: "#165c59", 
    borderRadius: 50, 
    width: 50,
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: { 
    color: "#fff", 
    fontSize: 30,
    textAlign: "center",
  },

  // Water Tracker
  waterTracker: { 
    alignItems: "center", 
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40 
  },

  // Bottom Controls
  bottomControls: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 40,
  },
  
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: "30%",
  },
  
  iconButton: {
    backgroundColor: "rgb(23, 117, 129)",
    borderRadius: 50,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  
  buttonText: {
    marginTop: 8,
    fontSize: 14,
    color: "#165c59",
    fontWeight: "bold",
  },

  bottomControlsIcon: {
    fontSize: 30,
    color: 'rgb(244, 254, 255)',
  },

  // Modal
  modalContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.5)" 
  },
  modalContent: { 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 10, 
    width: "80%", 
    alignItems: "center" 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  goalInput: { 
    borderBottomWidth: 1, 
    width: "60%", 
    marginBottom: 20, 
    textAlign: "center", 
    fontSize: 24 
  },

  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    width: "100%" 
  },
  modalButton: { 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: "#165c59", 
    borderRadius: 10, 
    marginHorizontal: 5 
  },
  modalButtonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },

  // Intake History
  intakeHistory: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  historyTitle: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(23, 117, 129)',
    marginBottom: 15,
  },
  intakeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
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
  intakeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  intakeAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(23, 117, 129)',
  },
  intakeTime: {
    fontSize: 14,
    color: 'rgb(92, 160, 167)',
  },
  emptyHistoryText: {
    textAlign: 'center',
    color: 'rgb(92, 160, 167)',
    fontSize: 16,
    marginTop: 20,
  },

  // Trends Section
  trendsContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(23, 117, 129)',
    marginBottom: 20,
  },
  comingSoonText: {
    fontSize: 16,
    color: 'rgb(92, 160, 167)',
    textAlign: 'center',
  },
});

export default stylesWaterTracker; 