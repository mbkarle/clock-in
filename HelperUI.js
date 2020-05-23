/*==========Home of globally useful UI components==========*/

/*----------Imports----------*/
import React from 'react';
import { Text, View, TouchableOpacity, Alert, Image, FlatList, StyleSheet } from 'react-native';
import styles from "./styles.js";
import { useNavigation } from '@react-navigation/native';
import Datastore from 'react-native-local-mongodb';
import { List, ListItem } from 'react-native-elements';


/*----------Images----------*/
const ImageSources = {
    home: require("./assets/home.png"),
    plus: require("./assets/plus.png"),
};

/*==========Database Related Content==========*/

/*----------The default database key----------*/
const asyncStorageKey = "Overclocked";

/*----------The default database----------*/
export const db = new Datastore({ filename: asyncStorageKey });


/*==========Graphic Aids==========*/

export function ActivityBox(props) {

  const listData = props.list.map((l) => ({key: l}));

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        renderItem={({item}) => <Text style={styles.activityListText}>{item.key}</Text>}
      />
    </View> )
}

/*----------Thin divider element----------*/
export function Separator() {
    return <View style={styles.separator} />;
}

/*----------Hide/Show Element----------*/
export function DisplayWrapper({ children, visibility }) {

    return (
        (visibility) ? <View>{children}</View> : null
    );
}


/*==========General Buttons==========*/

/*----------A small, customizable icon button in primary accent color----------*/
export function PrimaryButton(props) {
    const imagePath = (props.src) ? ImageSources[props.src] : null;
    const hasImage = (imagePath != null);
    const hasText = (props.text) ? true : false;
    //uses above booleans along with display wrappers to support either images or text

    const style = (props.style) ? [styles.primaryButton, props.style] : styles.primaryButton;

    return (
        <TouchableOpacity
            style={style}
            onPress={props.onPress}
        >
            <DisplayWrapper visibility={hasImage}>
                <Image style={styles.primaryButtonIcon} source={imagePath} />
            </DisplayWrapper>

            <DisplayWrapper visibility={hasText}>
                <Text>{props.text}</Text>
            </DisplayWrapper>
        </TouchableOpacity>
    );
}

export function AnchoredButton(props) {
    return (
        <View style={styles.anchoredView}>
            <PrimaryButton {...props} />
        </View>
    );
}

/*----------An instance of primary button specifically for navigation to profile----------*/
export function HomeButton() {
    const navigation = useNavigation();

    const toHome = () => {
        navigation.navigate("Profile");
    }

    return (
        <AnchoredButton src="home" onPress={toHome} />
    );
}
