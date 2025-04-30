import { StyleSheet } from 'react-native';

export const stylesTopNavigator = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  topSection: {
    backgroundColor: 'rgb(244, 254, 255)',
    width: '100%',
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,    
    shadowColor: "rgb(100, 100, 100)", // Dark color for a subtle shadow
    shadowOffset: { width: 0, height: 10}, // Shadow at the bottom
    shadowOpacity: 0.05,
    shadowRadius: 6,
    zIndex: 100,
    elevation: 6, // Ensures the shadow is visible on Android
  },

  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userIcon: {
    fontSize: 40,
    color: '#177581',
  },

  textContainer: {
    marginLeft: 10,
  },

  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#177581',
  },

  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },

  iconContact: {
    fontSize: 30,
    color: '#177581',
  },

  iconNotification: {
    fontSize: 30,
    color: '#177581',
  },

  burgerMenu: {
    fontSize: 27,
    color: 'rgb(244, 254, 255)',
    backgroundColor: '#177581',
    borderRadius: 5,
    padding: 3,
  },

  taskbarContainer: {
    height: 100,
    paddingTop: 15,
    flexDirection: 'row',
    backgroundColor: 'rgb(23, 117, 129)',
    shadowColor: "rgb(4, 2, 50)",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  iconActive: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(235, 244, 246)', 
    borderWidth: 2, 
    borderColor: 'rgb(251, 251, 251)', 
    borderRadius: 15,  
    height: 45,
    width: 45,
  },
});
