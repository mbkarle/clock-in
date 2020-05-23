/*==========User Profile Screen==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from "./styles.js";
import ErrorBoundary from 'react-native-error-boundary';
import { Separator, usersdb, PrimaryButton, DisplayWrapper, AnchoredButton, ActivityBox } from "./HelperUI.js";

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

    const list = ["play terraria","play terraria more","play minecraft","play skyrim","play vim"];
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

            });
        })
    }

    useEffect(populateProfile, [myName]);
    

    return (
        <ErrorBoundary>
            <View style={styles.container}>
                <View style={[styles.container, {marginTop: 0}]}>
                    <Title text={myName}/> 
                    <PrimaryButton 
                        text="Go to my activity" 
                        style={{marginTop: 30, borderRadius: 10}} 
                        onPress={toActivity}
                    />
                    <PrimaryButton
                        text="Print user database to console"
                        style={{backgroundColor: Colors.error, borderRadius: 10, marginTop: 50}}
                        onPress={ () => {
                            usersdb.loadDatabase( (err) => {
                                if(err) throw err;

                                usersdb.find({}, (err, docs) => {
                                    if(err) throw err;

                                    console.log("DOCS LENGTH: " + docs.length);
                                    console.log(JSON.stringify(docs, null, 4));
                                });
                            });
                        }}
                    />
                </View>
                <ActivityBox list = {list} route="Activity"/>
                <AnchoredButton
                    src="plus"
                    onPress={() => { navigation.navigate("Modal") }}
                />
            </View>
        </ErrorBoundary>
    );
}
