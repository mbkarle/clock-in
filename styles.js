import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDim: {
        padding: 5,
        width: 100,
        height: 100,
        borderRadius: 200,
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#2d2d2d",
        justifyContent: "center",
        margin: 3,
        shadowColor: '#9400D3',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .8,
        borderColor: "black",
        borderWidth: 2,
    },
    textButton: {
        color: "#f0fff0",
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        backgroundColor: "#000000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: (width - 100),
    },
    tickMark: {
        borderLeftWidth: 2,
        height: 10,
    }
});
