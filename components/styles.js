import { Dimensions, StyleSheet } from "react-native"
export const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 8

    }
})