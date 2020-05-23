/*==========Modal Screen==========*/

/*----------Imports----------*/
import React, {useState} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from './styles.js';
import { HomeButton, Separator, SingleInput, PrimaryButton, usersdb, activitiesdb } from "./HelperUI.js";

export default function Modal({ navigation }) {

    const [inputValue, setInputValue] = useState("");
    const inputPlaceholder = "Activity Name..."

    return (
        <View style={[styles.container]}>
            <Text style={ styles.activityTitle }> New Activity </Text>
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
                        addActivity(inputValue);
                        navigation.navigate("Profile");
                    }
                    else {
                        Alert.alert("Please name your activity");
                    }
                } }/>
            </View>
        </View>
    );

}

function addActivity(name) {
    activitiesdb.loadDatabase( (err) => {
        if(err) throw err;

        let activity = {
            name: name,
            accumulatedTime: 0,
            startTime: -1,
            isActive: false,
            tags: []
        }

        activitiesdb.insert(activity, (err, res) => {
            if(err) throw err;
            pushActivityToUser(res._id);
        });
    });
}

function pushActivityToUser(id) {
    usersdb.loadDatabase( (err) => {
        if(err) throw err;

        usersdb.update({}, { $push: { activities: id } }, (err) => {
            if(err) throw err;
            console.log("added activity to user")
        });
    });
}
