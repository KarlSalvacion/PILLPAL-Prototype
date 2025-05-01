import { StyleSheet } from 'react-native';

const stylesSideMenu = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      menuContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '70%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingTop: 50,
        paddingHorizontal: 20,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#177581',
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
      },
      menuItemText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#177581',
      },
    
});

export default stylesSideMenu;