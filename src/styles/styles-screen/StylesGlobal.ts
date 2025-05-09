import { StyleSheet, StatusBar } from "react-native";
const stylesGlobal = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: 'rgb(244, 254, 255)',
    },
});

export default stylesGlobal;