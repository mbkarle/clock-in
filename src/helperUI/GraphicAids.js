/*==========Graphic Aid Components==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Animated, Text, View, Image, TextInput, } from 'react-native';
import styles, {Colors, width} from "../styles.js";
import { activitiesdb, usersdb } from "../DB.js";

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
