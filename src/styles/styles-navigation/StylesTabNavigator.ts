import { StyleSheet } from "react-native";

const stylesTabNavigator = StyleSheet.create({

    tabBarStyle: {
        alignContent: 'center',
        flexDirection: 'row',  
        paddingTop: 25, 
        height: 80,
        backgroundColor: '#E9F6FE',
        borderTopWidth: 0,
    },
    tabBarItemStyle: {
        padding: 0,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 80,
    },
    activeTab: {
        backgroundColor: '#177581',
        color: '#fff',
        borderRadius: 15,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        color: 'gray',
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '600',
    },
    headerStyle: {
        backgroundColor: '#007AFF',
    },
});

export default stylesTabNavigator;