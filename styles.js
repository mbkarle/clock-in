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
        margin: 3
   },
   buttonBorders: {
       borderColor: "red",
       borderWidth: 0,
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
    }
    

});
