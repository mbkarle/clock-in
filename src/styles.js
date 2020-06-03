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
        marginTop: 50,
        color: Colors.backgroundText,
        fontSize: 30,
        alignSelf: "center",
        fontWeight: 'bold',
    },
    timeHeader: {
        marginTop:100,
        color: Colors.backgroundText,
        fontSize: 25,
        fontWeight: "bold",
    },
    modalTitle: {
        marginTop: 50,
        color: Colors.backgroundText,
        fontSize: 35,
        alignSelf: "flex-start",
        marginLeft: 20,
        fontWeight: "bold",
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
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 35,
        alignItems: 'flex-end',
    },

    activityListText: {
      padding: 10,
      alignItems: 'center',
      color: Colors.backgroundText,
      fontSize: 20,
    },

    floatRight: {
        marginLeft: width/2
    },

    floatLeft: {
        marginRight: width/2
    },

    profileTitle: {
        color: Colors.backgroundText,
        fontSize: 24,
    },

    singleInput: {
        borderColor: Colors.backAuxiliary,
        borderWidth: 2,
        borderRadius: 20,
        width: width - 40,
        padding: 15,
        color: Colors.backgroundText,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    swipeoutButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',

    },

    deleteSwipeoutButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Colors.error,

    },

    addGoalSwipeoutButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: Colors.secondary,
    },

    new2AddGoalSwipeoutButton: {
        width:40,
        height:40,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondary,
    },

    new2DeleteSwipeoutButton: {
        width:40,
        height:40,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: Colors.error,

    },

    swipeoutImage: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      backgroundColor: 'transparent'
    },

    loadingIcon: {
        width: 200,
        height: 200,
    },

    loadView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(10, 10, 10, 125)",
    },
});
