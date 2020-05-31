/*==========User Profile Screen==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from "./styles.js";
import ErrorBoundary from 'react-native-error-boundary';
import {
    Separator, PrimaryButton, DisplayWrapper, AnchoredButton, ActivityBox, Loadable, SwipableScrollBox
} from "./HelperUI.js";
import { useFocusEffect } from '@react-navigation/native';
import { activitiesdb, usersdb } from "./DB.js";

function Title(props){
    return (
        <View style={styles.container}>
            <Text style={styles.profileTitle}>{props.text}</Text>
            <Separator />
        </View>
    );
}

const initProfile = () => {
    let doc = {
        name: "Matt",
        tags: [],
        activities: []
    }

    usersdb.insert(doc);

    Alert.alert("Initialized User info")
}

export default function Profile({ navigation }) {

    const [activities, setActivities] = useState([]);
    const [nameVisible, setNameVisible] = useState(false);
    const [myName, setMyName] = useState(null);
    const [isLoaded, setLoaded] = useState(false);

    const toActivity = () => { //go to activity screen
        navigation.navigate("Activity");
    }

    const populateProfile = () => { //perform db calls for user information
        usersdb.getOne({}, (user) => {
            if(user == null)
                return initProfile();

            setMyName(user.name);
            loadActivities(user.activities, setActivities, () => setLoaded(true));
        });
    }

    useFocusEffect( // better than use effect because adds new activity to list when user adds one
        //worse than use effect because unnecessarily performs extra api calls
        //consider using callback provided to "new activity" modal
        //real TODO: generalize modal appropriately
        React.useCallback(populateProfile, [])
    );


    return (
        <ErrorBoundary>
        <Loadable loaded={isLoaded}>
            <View style={styles.container}>
                <View style={[styles.container, {marginTop: 0}]}>
                    <Title text={myName}/>
                </View>

                <ActivityBox list={activities} />
                <PrimaryButton
                    text="Print user database to console"
                    style={{backgroundColor: Colors.error, borderRadius: 10, marginTop: 50}}
                    onPress={printUser}
                />

                <PrimaryButton
                    text="Print activity database to console"
                    style={{backgroundColor: Colors.error, borderRadius: 10, marginTop: 50}}
                    onPress={printActivities}
                />


                <AnchoredButton
                    src="plus"
                    onPress={() => { navigation.navigate("Modal", {mode:"Activity"}), {callback: populateProfile} }}
                />
            </View>
        </Loadable>
        </ErrorBoundary>
    );
}

function loadActivities(ids, setActivities, callback) {
    activitiesdb.get( {_id: {$in: ids}}, (docs) => {
        names = docs.map( (doc) => doc.name );//optional step to simplify data for now
        //TODO: decide how much data to pass in navigation or whether activity page should redo call

        setActivities(names);
        if(callback)
            callback();
    });
}

/*----------Helper function to console log db information----------*/
export const printDocs = (docs) => {
    console.log("DOCS LENGTH: " + docs.length);
    for(let i = 0; i < docs.length; i++) {
        console.log("================================");
        for(let key in docs[i]) {
            let val = docs[i][key];
            console.log(key + ": " + JSON.stringify(val) + "\n");
        }
        console.log("================================");
    }
}

function printUser() {
    usersdb.get({}, printDocs);
}

function printActivities() {
    activitiesdb.get({}, printDocs)
}
