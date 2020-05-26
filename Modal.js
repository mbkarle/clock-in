/*==========Modal Screen==========*/

/*----------Imports----------*/
import React, {useState} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from './styles.js';
import { HomeButton, Separator, SingleInput, PrimaryButton} from "./HelperUI.js";
import { activitiesdb, usersdb } from "./DB.js";

export default function Modal({ route, navigation }) {

    //const completionCallback = route.params.callback;
    const [inputValue, setInputValue] = useState("");
    const inputPlaceholder = "Activity Name..."

    return (
        <View style={[styles.container]}>
            <Text style={ styles.modalTitle }> New Activity </Text>
            <View style={[styles.container]}>
            <SingleInput placeholder={inputPlaceholder} parentHandler={(value) => {
                setInputValue(value);
            }}/>    
            </View>
            <View style={styles.anchoredView}>
                <PrimaryButton src="x" align="left" style={[{backgroundColor: Colors.error}, styles.floatLeft]}
                onPress={ () => navigation.navigate("Profile") } />
                <PrimaryButton src="plus" style={[{backgroundColor: Colors.secondary}]}
                onPress={ () => {
                    if(inputValue.length > 0 && inputValue != inputPlaceholder) {
                        addActivity(inputValue, navigation);
                    }
                    else {
                        Alert.alert("Please name your activity");
                    }
                } }/>
            </View>
        </View>
    );

}

function addActivity(name, navigation) {
    let activity = {
        name: name,
        accumulatedTime: 0,
        startTime: -1,
        isActive: false,
        tags: []
    }
    activitiesdb.upload(activity, (res) => {
        usersdb.push({}, "activities", res._id, () => navigation.navigate("Profile") )
    });
}

