import React, {useState, useEffect, useRef} from 'react';
import { Animated, Text, View, TouchableOpacity, Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import styles from "./styles.js";
import { Separator, HomeButton } from "./HelperUI.js";
import Profile from "./Profile.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


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

/*----------The Clock----------*/
/*TODO:
 * Change seconds to calculation relative to a start time
 * Store start time so clock accurately gets time when app closed and reopened
 * Work design
 */
function Clock(props) {
   
    const [time, setTime] = useState(0); //state variable to track time in seconds
    const [isActive, setActive] = useState(false); //state variable to track if clock is unpaused
    const { hrs, mins, secs } = convertSeconds(time); //formatted time variables

    const shadowRadius = useRef(new Animated.Value(0)).current;

    const toggle = () => {
        setActive(!isActive); //toggle paused/unpaused
        
        if(!isActive) { //animate out shadow if clock active TODO: isActive behavior contrary to expectation
            Animated.timing(shadowRadius, {
                toValue: 10,
                duration: 1000,
                useNativeDriver: true
            }).start()
        }
        else{ //if clock paused/inactive git rid of shadow entirely
            shadowRadius.setValue(0)
        }
    }

    useEffect(() => { //if active, run timer
        let interval = null;
        if(isActive) {
            interval = setInterval( () => {
                setTime(time + 1);
            }, 1000);
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
          <Text style={{marginTop: 25}}>Gened Final</Text>
          <Separator />
          <Clock />
            <HomeButton />
        </View>
    );
}


/*==========The full app view==========*/

/*----------Navigator for Pages----------*/
const Stack = createStackNavigator();

//Uses error boundary for display in case of javascript error
export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Activity" component={Activity} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>

  );
}
