import { StyleSheet } from "react-native";

const stylesWaterTracker = StyleSheet.create({
  // Main Container
  container: { 
    flex: 1, 
    alignItems: "center", 
    backgroundColor: "#f6f6f6", 

  },

  // Titles and Text
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginVertical: 20, 
    color: "#165c59" 
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
    padding: 10, 
    marginTop: 10 
  },
  addButtonText: { 
    color: "#fff", 
    fontSize: 30 
  },

  // Water Tracker
  waterTracker: { 
    alignItems: "center", 
    marginBottom: 40 
  },

  // Bottom Controls
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
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
});

export default stylesWaterTracker; 