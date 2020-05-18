import {StyleSheet, Dimensions} from 'react-native';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

/*----------Default Color Palette----------*/
export const Colors = {
    background: "#121212",
    backAuxiliary: "#2d2d2d",
    primary: "#BB86FC",
    secondary: "#03DAC6",
    error: "#CF6679",
    backgroundText: "#FFF",
}

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityTitle: {
        marginTop: 25,
        color: Colors.backgroundText,
        fontSize: 20,
    },
    clockDim: {
        padding: 5,
        width: 150,
        height: 150,
        borderRadius: 300,
    },
    clock: {
        alignItems: 'center',
        backgroundColor: Colors.backAuxiliary,
        justifyContent: "center",
        margin: 3,
        shadowColor: '#9400D3',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .8,
        borderColor: "black",
        borderWidth: 2,
    },
    clockText: {
        color: Colors.backgroundText,
        fontSize: 22,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: Colors.backgroundText,
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: (width - 100),
    },
    primaryButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 64,
        padding: 20,
    },
    primaryButtonIcon: {
        width: 32,
        height: 32,
    },

    anchoredView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 35,
        alignItems: 'flex-end',
        marginLeft: width-134,
    }
});
