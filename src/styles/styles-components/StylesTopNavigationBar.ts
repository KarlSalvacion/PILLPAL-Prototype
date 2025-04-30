import { StyleSheet } from 'react-native';
const stylesTopNavigator = StyleSheet.create({
    topSection: {
      backgroundColor: 'rgb(244, 254, 255)',
      width: '100%',
      height: 80,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    burgerMenu: {
      fontSize: 27,
      color: 'rgb(244, 254, 255)',
      backgroundColor: '#177581',
      borderRadius: 5,
      padding: 3,
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
});

export default stylesTopNavigator;
