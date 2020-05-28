import React from 'react';
import { Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import styles, {Colors} from "./src/styles.js";
import Profile from "./src/Profile.js";
import Activity from "./src/Activity.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "./src/Modal.js";





/*==========The full app view==========*/

/*----------Navigator for Pages----------*/
const MainStack = createStackNavigator(); //the card based stack containing main app screens
const RootStack = createStackNavigator(); //the modal stack containing main stack and modal

function MainStackScreen() {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.background,
                },
                headerTintColor: Colors.primary,
            }}
            initialRouteName="Profile"
        >
            <MainStack.Screen name="Activity" component={Activity} />
            <MainStack.Screen name="Profile" component={Profile} />
        </MainStack.Navigator>
    );
}

//Uses error boundary for display in case of javascript error
export default function App() {
  return (
    <ErrorBoundary>
        <NavigationContainer>
            <RootStack.Navigator mode="modal">
                <RootStack.Screen
                    name="Main"
                    component={MainStackScreen}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen name="Modal" component={Modal} options={{ headerShown: false }}/>
            </RootStack.Navigator>
        </NavigationContainer>
    </ErrorBoundary>

  );
}
