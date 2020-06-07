import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text, View, TouchableOpacity, Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import styles, {Colors} from "./styles.js";
import { Separator, HomeButton, CustomLineChart } from "./HelperUI.js";
import {activitiesdb} from "./DB.js";
import {printDocs} from "./Profile.js";

/*----------Clock helper function to pad times with 0s----------*/
const formatNumber = number => `0${number}`.slice(-2);

/*----------Clock helper functions to convert seconds to HH:MM:SS----------*/
const convertSeconds = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const remainder = seconds % 3600;

    const mins = Math.floor(remainder / 60);
    const secs = remainder % 60;

    return { hrs: formatNumber(hrs), mins: formatNumber(mins), secs: formatNumber(secs) };
}

const getCurrentTime = () => {
  var t1 = new Date();
  var time = t1.getTime() / 1000;
  return Math.floor(time);
}

/*----------The Clock----------*/
/*TODO:
 * Store start time persistantly
 * Work design
 */
function Clock(props) {

    const [time, setTime] = useState(0); //state variable to track time in seconds
    const [accumulatedTime, setAccumulatedTime] = useState(0); //state variable to track time at start of each active phase
    const [endPauseTime, setEndPauseTime] = useState(getCurrentTime()); ////state variable to track paused time in seconds
    const [isActive, setActive] = useState(false); //state variable to track if clock is unpaused
    const { hrs, mins, secs } = convertSeconds(time); //formatted time variables

    const shadowRadius = useRef(new Animated.Value(0)).current;

    const toggle = () => {
        activitiesdb.update({name:props.activity}, {$set: {isActive: !isActive}});
        if(!isActive)
            toggleActiveEffect();
        else
            toggleInactiveEffect();
        setActive(!isActive)
    }

    const toggleActiveEffect = () => { //functions with appropriate state variable scopes for useEffect
        setEndPauseTime(getCurrentTime()); //record start time of active phase
        activitiesdb.update({name:props.activity}, {$set: {startTime: getCurrentTime()}})
        Animated.timing(shadowRadius, { //animate shadow radius around active clock
            toValue: 10,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const toggleInactiveEffect = () => {
        shadowRadius.setValue(0);
        setAccumulatedTime(time);
        activitiesdb.update({name:props.activity}, {$set: {accumulatedTime: time}});
    }

    useEffect(() => {//populate from storage only on first render
        activitiesdb.getOne({name: props.activity}, (activity) => {//assume only one of name
            if(activity.startTime != -1)
                setEndPauseTime(activity.startTime);
            setActive(activity.isActive);
            setAccumulatedTime(activity.accumulatedTime);
            shadowRadius.setValue(activity.isActive ? 10 : 0);

            //if active set time with relative to recorded start, as has been running whole time
            setTime( (activity.isActive) ? (activity.accumulatedTime + (getCurrentTime() - activity.startTime)) : activity.accumulatedTime);
        });
    }, []);

    useEffect(() => { //if active, run timer
        let interval = null;
        if(isActive) {
            interval = setInterval( () => { //start time
                setTime(accumulatedTime + (getCurrentTime()-endPauseTime)); //updates time every 100ms
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isActive, accumulatedTime]); //array parameter specifies effect only used on change of isactive and time

    return (
        <TouchableOpacity
            style={[styles.clock, styles.clockDim, {marginTop: 50, shadowRadius: shadowRadius}]}
            onPress={toggle}
        >
            <Text style={styles.clockText}>{hrs}:{mins}:{secs}</Text>
        </TouchableOpacity>
    );
}

/*----------Activity----------*/
//TODO: Move to own file with internal components
//Generalize to display activity info for any activity
export default function Activity({ route, navigation }) { //route allows for passing of object when this route callled

    const activityTitle = route.params.activity; //Text at top of clock matches activity

    return (
        <View style={styles.container}>
          <Text style={styles.activityTitle}>{activityTitle}</Text>
          <Separator />
          <Clock activity={activityTitle}/>
            <HomeButton />
        </View>
    );
}
