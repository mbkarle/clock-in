import React, {useState, useEffect, useRef} from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import styles from "./styles.js";

function Separator() {
    return <View style={styles.separator} />;
}


const formatNumber = number => `0${number}`.slice(-2);

function convertSeconds(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const remainder = seconds % 3600;

    const mins = Math.floor(remainder / 60);
    const secs = remainder % 60;

    return { hrs: formatNumber(hrs), mins: formatNumber(mins), secs: formatNumber(secs) };
}

function Clock(props) {
   
    const [time, setTime] = useState(0); //state variable to track time in seconds
    const [isActive, setActive] = useState(false); //state variable to track if clock is unpaused
    const { hrs, mins, secs } = convertSeconds(time); //formatted time variables

    const shadowRadius = useRef(new Animated.Value(0)).current;

    const toggle = () => {
        setActive(!isActive); //toggle paused/unpaused
        
        if(!isActive) {
            Animated.timing(shadowRadius, {
                toValue: 10,
                duration: 1000,
                useNativeDriver: true
            }).start()
        }
        else{
            shadowRadius.setValue(0)
        }
    }

    useEffect(() => {
        let interval = null;
        if(isActive) {
            interval = setInterval( () => {
                setTime(time + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonDim, {marginTop: 50, shadowRadius: shadowRadius}]}
            onPress={toggle}
        >
            <Text style={styles.textButton}>{hrs}:{mins}:{secs}</Text>
        </TouchableOpacity>
    );
}

export default function App() {
  return (
    <ErrorBoundary>
        <View style={styles.container}>
          <Text>Big Balled Boys</Text>
          <Separator />
          <Clock />
        </View>
      </ErrorBoundary>

  );
}
