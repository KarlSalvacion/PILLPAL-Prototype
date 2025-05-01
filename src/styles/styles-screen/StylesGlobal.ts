import { StyleSheet, StatusBar } from "react-native";
const stylesGlobal = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#EeF6FE',
    },
});

export default stylesGlobal;