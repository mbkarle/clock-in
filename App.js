import React, {useState} from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import styles from "./styles.js";

function Separator() {
    return <View style={styles.separator} />;
}

function Button(props) {
    const rotate = new Animated.Value(0);
    const onPress = () => {
        rotate.setValue(0);
        Animated.timing(rotate, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <TouchableOpacity
            style={[styles.button, styles.buttonDim, {marginTop: 50, transform:[{rotate: rotation}]}]}
            onPress={onPress}
        >
            <Text style={styles.textButton}>{props.title}</Text>
        </TouchableOpacity>
    );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Big Balled Boys</Text>
      <Separator />
      <ErrorBoundary>
          <Button title="Press me"/>
      </ErrorBoundary>
    </View>
  );
}

