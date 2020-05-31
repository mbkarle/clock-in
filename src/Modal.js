/*==========Modal Screen==========*/

/*----------Imports----------*/
import React, {useState} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from './styles.js';
import { HomeButton, Separator, SingleInput, PrimaryButton, TimePick} from "./HelperUI.js";
import { activitiesdb, usersdb } from "./DB.js";

export default function Modal({ route, navigation }) {

    //const completionCallback = route.params.callback;

    //Bottom two states only required for TimePick mode
    const [inputValue, setInputValue] = useState("");
    const inputPlaceholder = "Activity Name..."
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] =useState(0);

    var mode;
    var ModalInput;
    var title;
    var activity;
    var onPress;

    //set up infrastructure for two modes of the modal as follows
    //params of route has a mode element that is checked
    //modal component set and onPress set
    //I anticipate as we have more uses for the modal this infrastructure
    //will have to change but it is working nicely for now

    //To see goal change, print database, no other place displaying goal yet

    if (route.params.mode === "TimePick") {
         mode = "TimePick";
         ModalInput = <TimePick
            hours = {hours}
            setHours = {setHours}
            minutes = {minutes}
            setMinutes = {setMinutes}
        />;
         title = "Set Goal";
         activity = route.params.activity;
         onPress = (() => {
          addGoal(hours, minutes, activity, navigation)
          navigation.navigate("Profile")
        });

    } else {
         mode = "ActivityPick";
         ModalInput = <SingleInput placeholder={inputPlaceholder} parentHandler={(value) => {
            setInputValue(value)}}/>;
         onPress = (() => {
          if(inputValue.length > 0 && inputValue != inputPlaceholder) {
              addActivity(inputValue, navigation);
          }
          else {
              Alert.alert("Please name your activity");
          }
        });
        title = "New Activity ";
    }


    return (
        <View style={[styles.container]}>
            <Text style={ styles.modalTitle }> {title} </Text>
            <View style={[styles.container]}>
            {ModalInput}
            </View>
            <View style={styles.anchoredView}>
                <PrimaryButton src="x" align="left" style={[{backgroundColor: Colors.error}, styles.floatLeft]}
                onPress={ () => navigation.navigate("Profile") } />
                <PrimaryButton src="plus" style={[{backgroundColor: Colors.secondary}]}
                onPress={onPress}
                />
            </View>
        </View>
    );

}

//Helper Functions
function addGoal(hours, minutes, activity, navigation) {

    const seconds = (hours * 60 * 60) +  minutes * 60;
    activitiesdb.set({name:activity}, {$set: {goal:seconds}})
    navigation.navigate("Profile")
}

function addActivity(name, navigation) {
    let activity = {
        name: name,
        accumulatedTime: 0,
        startTime: -1,
        isActive: false,
        goal: 0,
        tags: []
    }
    activitiesdb.upload(activity, (res) => {
        usersdb.push({}, "activities", res._id, () => navigation.navigate("Profile") )
    });
}
