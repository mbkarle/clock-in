import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text, View, TouchableOpacity, Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import styles, {Colors} from "./styles.js";
import { Separator, HomeButton } from "./HelperUI.js";
import Profile from "./Profile.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "./Modal.js";


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
    const [acumulatedTime, setAcumulatedTime] = useState(0); //state variable to track time at start of each active phase
    const [endPauseTime, setEndPauseTime] = useState(getCurrentTime()); ////state variable to track paused time in seconds
    const [isActive, setActive] = useState(false); //state variable to track if clock is unpaused
    const { hrs, mins, secs } = convertSeconds(time); //formatted time variables

    const shadowRadius = useRef(new Animated.Value(0)).current;

    const toggle = () => {

        setActive(!isActive); //toggle paused/unpaused

        if(!isActive) { //animate out shadow if clock active TODO: isActive behavior contrary to expectation
            setEndPauseTime(getCurrentTime()); //record start time of active phase
            Animated.timing(shadowRadius, {
                toValue: 10,
                duration: 1000,
                useNativeDriver: true
            }).start()
        }
        else{ //if clock paused/inactive git rid of shadow entirely
            shadowRadius.setValue(0);
            setAcumulatedTime(time);
        }
    }

    useEffect(() => { //if active, run timer
        let interval = null;
        if(isActive) {
            interval = setInterval( () => {
                setTime(acumulatedTime + (getCurrentTime()-endPauseTime)); //updates time every 100ms
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isActive, time]); //array parameter specifies effect only used on change of isactive and time

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
function Activity({ navigation }) {

    return (
        <View style={styles.container}>
          <Text style={styles.activityTitle}>Gened Final</Text>
          <Separator />
          <Clock />
            <HomeButton />
        </View>
    );
}


/*==========The full app view==========*/

/*----------Navigator for Pages----------*/
const MainStack = createStackNavigator(); //the card based stack containing main app screens
const RootStack = createStackNavigator(); //the modal stack containing main stack and modal

function MainStackScreen() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.background,
                },
                headerTintColor: Colors.primary,
            }}
            initialRouteName="Profile"
        >
            <MainStack.Screen name="Activity" component={Activity} />
            <MainStack.Screen name="Profile" component={Profile} />
        </MainStack.Navigator>
    );
}

//Uses error boundary for display in case of javascript error
export default function App() {
  return (
    <ErrorBoundary>
        <NavigationContainer>
            <RootStack.Navigator mode="modal">
                <RootStack.Screen
                    name="Main"
                    component={MainStackScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen name="Modal" component={Modal} options={{ headerShown: false }}/>
            </RootStack.Navigator>
        </NavigationContainer>
    </ErrorBoundary>

  );
}
