/*==========Modal Screen==========*/

/*----------Imports----------*/
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles.js';
import { HomeButton, ActivityBox } from "./HelperUI.js";

export default function Modal({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={[styles.activityTitle, {marginTop: 50}]}> This is my modal </Text>
            <HomeButton />
        </View>
    );

}
