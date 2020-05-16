/*==========Home of globally useful UI components==========*/

/*----------Imports----------*/
import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from "./styles.js";
import { useNavigation } from '@react-navigation/native';


/*----------Thin divider element----------*/
export function Separator() {
    return <View style={styles.separator} />;
}

export function PrimaryButton(props) {
    return (
        <TouchableOpacity
            style={styles.primaryButton}
            onPress={props.onPress}
        >
            <Text style={styles.primaryButtonText}> {props.text} </Text>
        </TouchableOpacity>
    );
}

export function HomeButton() {
    const navigation = useNavigation();

    const toHome = () => {
        navigation.navigate("Profile");
    }

    return (
        <View style={styles.bottomView}>
            <PrimaryButton text="Home" onPress={toHome} />
        </View>
    );
}
