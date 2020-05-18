/*==========User Profile Screen==========*/

/*----------Imports----------*/
import React, {useState} from 'react';
import { Text, View, Alert } from 'react-native';
import styles from "./styles.js";
import ErrorBoundary from 'react-native-error-boundary';
import { db, PrimaryButton, DisplayWrapper, AnchoredButton } from "./HelperUI.js";

export default function Profile({ navigation }) {
    const [nameVisible, setNameVisible] = useState(false);
    const [myName, setMyName] = useState(null);

    const toActivity = () => { //go to activity screen
        navigation.navigate("Activity");
    }
    
    const writeName = () => { //purely testing function for local storage
        db.loadDatabase( (err) => {
            if(err)
                return Alert.alert("Load failed: " + err);

            db.findOne( { name: "Matt" }, (err, doc) => {

                if(err)
                    return Alert.alert("Find failed: " + err);

                if(doc == null) {
                    db.insert({ name: "Matt" }, (err, newDoc) => {
                        if(err)
                            return Alert.alert("Insertion failed: " + err);
                    });
                }
                else {
                    setMyName(doc.name);
                    setNameVisible(!nameVisible);
                }

            });
        });
    }

    return (
        <ErrorBoundary>
            <View style={styles.container}>
                <View style={[styles.container, {marginTop: 20}]}>
                    <DisplayWrapper visibility={nameVisible}>
                        <Text style={styles.activityTitle}> {myName} </Text>
                    </DisplayWrapper>
                    <PrimaryButton text="Get username" onPress={writeName} />     
                    <PrimaryButton 
                        text="Go to my activity" 
                        style={{marginTop: 30, borderRadius: 10}} 
                        onPress={toActivity}
                    />
                </View>
                <AnchoredButton src="plus" />
            </View>
        </ErrorBoundary>
    );
}
