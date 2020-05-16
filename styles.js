import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

/*----------Default Color Palette----------*/
const colors = {};
colors.background = "#121212";
colors.primary = "#BB86FC";
colors.secondary = "#03DAC6";
colors.error = "#CF6679";
colors.backgroundText = "#FFF";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockDim: {
        padding: 5,
        width: 100,
        height: 100,
        borderRadius: 200,
    },
    clock: {
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
    clockText: {
        color: "#f0fff0",
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        backgroundColor: "#000000",
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: (width - 100),
    },
    primaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        width: 100,
        height: 50,
        borderRadius: 25,
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 35,
        alignItems: 'flex-end',
    }
});
