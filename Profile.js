/*==========User Profile Screen==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from "./styles.js";
import ErrorBoundary from 'react-native-error-boundary';
import {
    Separator, usersdb, PrimaryButton, DisplayWrapper, AnchoredButton, ActivityBox, activitiesdb, SwipableScrollBox
} from "./HelperUI.js";
import { useFocusEffect } from '@react-navigation/native';

function Title(props){
    return (
        <View style={styles.container}>
            <Text style={styles.profileTitle}>{props.text}</Text>
            <Separator />
        </View>
    );
}

const initProfile = () => {
    usersdb.loadDatabase( (err) => {
        if(err)
            throw err;

        doc = {
            name: "Matt",
            tags: [],
            activities: []
        }

        usersdb.insert(doc);

        Alert.alert("Initialized User info")

    });
}

export default function Profile({ navigation }) {

    const [activities, setActivities] = useState([]);
    const [nameVisible, setNameVisible] = useState(false);
    const [myName, setMyName] = useState(null);

    const toActivity = () => { //go to activity screen
        navigation.navigate("Activity");
    }

    const populateProfile = () => { //perform db calls for user information
        usersdb.loadDatabase( (err) => {
            if(err)
                throw err;

            usersdb.findOne({}, (err, user) => {
                if(err)
                    throw err;

                if(user == null)
                    return initProfile();

                setMyName(user.name);
                loadActivities(user.activities, setActivities);
            });
        })
    }

    useFocusEffect( // better than use effect because adds new activity to list when user adds one
        //worse than use effect because unnecessarily performs extra api calls
        //consider using callback provided to "new activity" modal
        //real TODO: generalize modal appropriately
        React.useCallback(populateProfile, [])
    );


    return (
        <ErrorBoundary>
            <View style={styles.container}>
                <View style={[styles.container, {marginTop: 0}]}>
                    <Title text={myName}/>
                </View>

                <ActivityBox list={activities}/>

                <PrimaryButton
                    text="Print user database to console"
                    style={{backgroundColor: Colors.error, borderRadius: 10, marginTop: 50}}
                    onPress={printUser}
                />

                <AnchoredButton
                    src="plus"
                    onPress={() => { navigation.navigate("Modal"), {callback: populateProfile} }}
                />
            </View>
        </ErrorBoundary>
    );
}

function loadActivities(ids, setActivities) {
    activitiesdb.loadDatabase( (err) => {
        if(err) throw err;

        activitiesdb.find( {_id : {$in: ids } }, (err, docs) => {
            if(err) throw err;

            names = docs.map( (doc) => doc.name ); //optional step to simplify data for now
            //TODO: decide how much data to pass in navigation or whether activity page should redo call

            setActivities(names)
            console.log("set activities to: " + JSON.stringify(names));
        });
    });

}

/*----------Helper function to console log user db information----------*/
function printUser() {
    usersdb.loadDatabase( (err) => {
        if(err) throw err;

        usersdb.find({}, (err, docs) => {
            if(err) throw err;

            console.log("DOCS LENGTH: " + docs.length);
            for(let i = 0; i < docs.length; i++) {
                console.log("================================");
                for(let key in docs[i]) {
                    let val = docs[i][key];
                    console.log(key + ": " + JSON.stringify(val) + "\n");
                }
                console.log("================================");

            }
        });
    });

}
