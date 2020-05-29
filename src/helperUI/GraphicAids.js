/*==========Graphic Aid Components==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Animated, Text, View, Image, TextInput, } from 'react-native';
import styles, {Colors, width} from "../styles.js";
import { activitiesdb, usersdb } from "../DB.js";
import TimePicker from 'react-native-simple-time-picker';
import {Picker} from 'react-native';//'@react-native-community/picker';
//Picker should be imported from react-native-community/pciker but this
//isn't supported in expo yet. Picker from react-native is depricated
//but can be used for now until community package is supported/

/*----------Thin divider element----------*/
export function Separator() {
    return <View style={styles.separator} />;
}

/*----------Hide/Show Element----------*/
export function DisplayWrapper({ children, visibility }) {

    return (
        (visibility) ? <View>{children}</View> : null
    );
}


/*----------Scrolling Item Containing Hours and Minutes----------*/
export function TimePick(props) {
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] =useState(0);

    var minutesTags = [];
    var hoursTags = [];

    var i;

    for (i = 0; i < 60; i++) {
        minutesTags.push(i.toString())
    }

    for (i = 0; i < 24; i++) {
        hoursTags.push(i.toString())
    }

    console.log(minutesTags)

    return(
      <View>
        <Text style={[{justifyContent:'center',}, styles.timeHeader]}>Hours : Mins</Text>
          <View style={{flexDirection:'row', justifyContent:'center'}}>
              <View style={{backgroundColor:'transparent',flex:1,justifyContent:'center'}}>
                <View style = {{alignItems:'flex-end'}}>
                  <Picker
                  selectedValue={hours}
                  style={{width:100,justifyContent:'center'}}
                  itemStyle={{color:'#FFF'}}
                  onValueChange={(itemValue, itemIndex) => {
                    setHours(itemValue)
                  }}>
                    {hoursTags.map((item, index) => {
                        return (<Picker.Item label={item} value={index} key={index}/>)
                    })}


                  </Picker>
                </View>
              </View>

              <View style={{backgroundColor:'transparent',flex:1,justifyContent:'center'}}>
                <Picker
                selectedValue={minutes}
                style={{width:100,justifyContent:'center'}}
                itemStyle={{color:'#FFF'}}
                onValueChange={(itemValue, itemIndex) => {
                  setMinutes(itemValue)
                }}>
                  {minutesTags.map((item, index) => {
                      return (<Picker.Item label={item} value={index} key={index}/>)
                  })}



                </Picker>
              </View>
        </View>
      </View>
  );
}

export function SingleInput(props) {
    const placeholder = props.placeholder || "Type something...";
    const [value, setValue] = useState(placeholder);
    const [clearOnFocus, setClearOnFocus] = useState(true);
    const [borderColor, setBorderColor] = useState(Colors.backAuxiliary);

    return (
        <TextInput
            style={[styles.singleInput, {borderColor: borderColor}]}
            onChangeText={text => {
                setClearOnFocus(false);
                setValue(text);
                if(props.parentHandler)
                    props.parentHandler(text);
            }}
            onFocus={() => setBorderColor(Colors.secondary)}
            onBlur={() => {
                setBorderColor(Colors.backAuxiliary);
                if(value == "")
                    setValue(placeholder);
            }}
            value={value}
            clearTextOnFocus={clearOnFocus}
            clearButtonMode="always"
            keyboardAppearance="dark"
            returnKeyType="done"
            {...props}
        />
   );

}

/*----------Loading Wrapper----------*/
export function Loadable({ children, loaded }) {
    const [contentShown, setContentShown] = useState(true);

    useEffect( () => { //if still not loaded within a second, show loading symbol
        let timeout = null;
        if(!loaded) {
            timeout = setTimeout( () => {
                setContentShown(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timeout);
            setContentShown(true);
        }
    }, [loaded]);


    return (contentShown) ? <View style={styles.container}>{children}</View> : <Loading />;
}

/*----------Loading visual----------*/
function Loading(props) {
    const [rotate, setRotate] = useState(new Animated.Value(0))

    Animated.loop(
        Animated.timing(
            rotate,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver:true,
            }
        )
    ).start();

    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={styles.container}>
            <Animated.Image source={ImageSources["loading"]}
                   style={[styles.loadingIcon, {transform: [{rotate: rotation}]}]} />
        </View>
    );
}
