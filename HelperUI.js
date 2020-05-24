/*==========Home of globally useful UI components==========*/

/*----------Imports----------*/
import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Alert, Image, TextInput, FlatList } from 'react-native';
import styles, {Colors, width} from "./styles.js";
import { useNavigation } from '@react-navigation/native';
import Datastore from 'react-native-local-mongodb';


/*----------Images----------*/
const ImageSources = {
    home: require("./assets/home.png"),
    plus: require("./assets/plus.png"),
    x: require("./assets/x-icon.png"),
};

/*==========Database Related Content==========*/

/*----------The default database keys----------*/
const usersStorageKey = "Users";
const activitiesStorageKey = "Activities";

/*----------Users Collection----------*/
export const usersdb = new Datastore({ filename: usersStorageKey });
export const activitiesdb = new Datastore({ filename: activitiesStorageKey });


/*==========Graphic Aids==========*/

/*----------A basic standard for list components----------*/
/* Motivated by scroll component generically passing text as a prop */
function BasicListItem(props) {
    return <Text {...props}> {props.text} </Text>;
}


/*----------A scrollable list with optional on press of elements----------*/
export function ScrollBox(props) {
    
    const listData = props.list.map((l) => ({key: l}));
    const ItemComponent = props.component || BasicListItem;

    return (
        <View style={[styles.container, props.style]}>
            <FlatList
                data={listData}
                renderItem={({item}) => 
                    <ItemComponent 
                        style={[styles.activityListText, props.itemStyles]}
                        onPress={
                            () => {
                                if(props.onPress)
                                    props.onPress(item)
                            }
                        }
                        text={item.key}
                    />
                    
                }
            />
        </View>
    );

}

/*----------Component Instance of scrollbox specific to activities----------*/
export function ActivityBox(props) {
    const navigation = useNavigation();
    const toActivity = (item) => {
        navigation.navigate("Activity", {activity: item.key})
    }
    return (
        <ScrollBox {...props} onPress={toActivity} style={{
            borderColor: Colors.backAuxiliary, borderWidth: 3, borderRadius: 20
        }} />
    );
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

export function SingleInput(props) {
    const placeholder = props.placeholder || "Type something...";
    const [value, setValue] = useState(placeholder);
    const [clearOnFocus, setClearOnFocus] = useState(true);
    const [borderColor, setBorderColor] = useState(Colors.backAuxiliary);
    
    return (
        <TextInput
            style={[styles.singleInput, {borderColor: borderColor}]}
            onChangeText={text => {
                setClearOnFocus(false);
                setValue(text);
                if(props.parentHandler)
                    props.parentHandler(text);
            }}
            onFocus={() => setBorderColor(Colors.secondary)}
            onBlur={() => {
                setBorderColor(Colors.backAuxiliary);
                if(value == "") 
                    setValue(placeholder);
            }}
            value={value}
            clearTextOnFocus={clearOnFocus}
            clearButtonMode="always"
            keyboardAppearance="dark"
            returnKeyType="done"
            {...props}
        />
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
    const horizAlign = props.align || "right";
    const marginKey = (horizAlign == "right") ? "marginLeft" : "marginRight";
    return (
        <View style={[styles.anchoredView, {[marginKey]: width - 134}]}>
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
