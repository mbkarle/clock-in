/*==========User Profile Screen==========*/

/*----------Imports----------*/
import React from 'react';
import { Text, View } from 'react-native';
import styles from "./styles.js";
import ErrorBoundary from 'react-native-error-boundary';

export default function Profile({ navigation }) {
    return (
        <ErrorBoundary>
            <View style={styles.container}>
                <Text> YUH </Text>
            </View>
        </ErrorBoundary>
    );
}
