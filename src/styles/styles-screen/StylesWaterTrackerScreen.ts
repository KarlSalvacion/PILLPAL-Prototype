import { StyleSheet } from "react-native";

const stylesWaterTracker = StyleSheet.create({
  // Main Container
  container: { 
    flex: 1, 
    alignItems: "center", 
    backgroundColor: "#fff", 
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

  // Goal Card
  goalCard: { 
    backgroundColor: "#d1ebeb", 
    padding: 20, 
    borderRadius: 15, 
    alignItems: "center", 
    marginBottom: 20 
  },

  // Tracker Content
  trackerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  centeredWaterLevel: {
    alignItems: 'center',
    marginBottom: 20,
  },
  waterTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  waterText: { 
    fontSize: 48, 
    color: "rgb(23, 117, 129)", 
    fontWeight: "bold" 
  },
  goalText: { 
    fontSize: 18, 
    color: "#6c6c6c" 
  },

  // Toggle Buttons
  toggleContainer: { 
    flexDirection: "row", 
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
    gap: 10,
  },
  toggleButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "rgb(23, 117, 129)", 
  },
  toggleButtonSelected: { 
    backgroundColor: "rgb(23, 117, 129)", 
  },
  toggleText: { 
    color: "rgb(23, 117, 129)", 
    fontWeight: "bold" 
  },

  // Buttons
  addGoalButton: { 
    backgroundColor: "rgb(23, 117, 129)", 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    borderRadius: 20 
  },
  addGoalText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  addButton: { 
    backgroundColor: "rgb(23, 117, 129)", 
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
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: { 
    backgroundColor: "#fff", 
    padding: 24, 
    borderRadius: 20, 
    width: "85%", 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: "#165c59",
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  goalInput: { 
    borderWidth: 2,
    borderColor: "#165c59",
    borderRadius: 12,
    width: "70%", 
    marginBottom: 20, 
    textAlign: "center", 
    fontSize: 28,
    paddingVertical: 12,
    color: "#165c59",
  },
  measurementToggle: {
    flexDirection: 'row',
    backgroundColor: '#f0f9f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  measurementButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  measurementButtonSelected: {
    backgroundColor: '#165c59',
  },
  measurementText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#165c59',
  },
  measurementTextSelected: {
    color: '#fff',
  },
  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    width: "100%",
    marginTop: 10,
  },
  modalButton: { 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    backgroundColor: "#165c59", 
    borderRadius: 12, 
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonText: { 
    color: "white", 
    fontWeight: "bold",
    fontSize: 16,
  },

  // Intake History
  intakeHistory: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 0,
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
    borderWidth: 1,
    borderColor: 'rgba(198, 198, 198, 0.4)',
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