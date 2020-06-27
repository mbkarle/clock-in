/*==========User Profile Screen==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Text, View, Alert } from 'react-native';
import styles, {Colors} from "./styles.js";
import ErrorBoundary from 'react-native-error-boundary';
import { printDocs } from './Profile';
import {
    Separator, PrimaryButton, DisplayWrapper, AnchoredButton, ActivityBox, Loadable, SwipableScrollBox
} from "./HelperUI.js";
import { useFocusEffect } from '@react-navigation/native';
import { activitiesdb, usersdb } from "./DB.js";
import { HomeButton } from './helperUI/Buttons.js';

export default function TestPage ({ navigation }) {

    return (
        <View style={styles.container}> 
            <Text>Testing Page</Text>
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
            <HomeButton />
        </View>
    )
}


function printUser() {
    usersdb.get({}, printDocs);
}

function printActivities() {
    activitiesdb.get({}, printDocs)
}
