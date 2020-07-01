/*==========Buttons==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Alert, Image, } from 'react-native';
import styles, {Colors, width} from "../styles.js";
import { useNavigation } from '@react-navigation/native';
import { DisplayWrapper, ImageSources } from "../HelperUI.js";

/*----------A small, customizable icon button in primary accent color----------*/
export function PrimaryButton(props) {
    const imagePath = (props.src) ? ImageSources[props.src] : null;
    const hasImage = (imagePath != null);
    const hasText = (props.text) ? true : false;
    //uses above booleans along with display wrappers to support either images or text

    const style = (props.style) ? [styles.primaryButton, props.style] : styles.primaryButton;
    const imageStyle = (props.imageStyle) ? props.imageStyle : styles.primaryButtonIcon;

    return (
        <TouchableOpacity
            style={style}
            onPress={props.onPress}
        >
            <DisplayWrapper visibility={hasImage}>
                <Image style={imageStyle} source={imagePath} />
            </DisplayWrapper>

            <DisplayWrapper visibility={hasText}>
                <Text>{props.text}</Text>
            </DisplayWrapper>
        </TouchableOpacity>
    );
}

export function AnchoredButton(props) {
    const horizAlign = props.align || "right";
    const marginKey = (horizAlign == "right") ? "marginLeft" : "marginRight";
    const bottomMargin = props.bottomMargin ? props.bottomMargin : 35
    return (
        <View style={[styles.anchoredView, {[marginKey]: width - 134, marginBottom: bottomMargin}]}>
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
