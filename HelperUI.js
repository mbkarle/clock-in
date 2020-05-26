/*==========Home of globally useful UI components==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Animated, Text, View, TouchableOpacity, Alert, Image, TextInput, FlatList } from 'react-native';
import styles, {Colors, width} from "./styles.js";
import { useNavigation } from '@react-navigation/native';
import Swipeout from 'react-native-swipeout';

import { activitiesdb, usersdb } from "./DB.js";

/*----------Images----------*/
const ImageSources = {
    home: require("./assets/home.png"),
    plus: require("./assets/plus.png"),
    x: require("./assets/x-icon.png"),
    loading: require("./assets/loading.png"),
};

/*==========Graphic Aids==========*/

/*----------A basic standard for list components----------*/
/* Motivated by scroll component generically passing text as a prop */
function BasicListItem(props) {
    return <Text {...props}> {props.text} </Text>;
}

/*------------Component that can be swiped in flatlist------------*/
//TODO
//Found bug that changing parent state wasnt rerendering flatlist so
// deleted items remained visibile until forced re render. As work background
// I have the height of the list item set to 0 when delete is pressed,
// (as well as all deletions from the databases) and then
// upon any re render it will be removed. This will need to be fixed.
function SwipableListItem(props) {

    const [activeRowKey, setActiveRowKey] = useState(null);
    const [height, setHeight] =useState(40);
    const imagePath = (props.src) ? ImageSources[props.src] : null;


    const swipeSettings = { //params for <swipeout>
      autoClose: true,
      onClose: (secId, rowId, direction) => {
          if (activeRowKey != null) {
              setActiveRowKey(null);
          }
      },
      onOpen: (secId, rowId, direction) => {
          setActiveRowKey(props.ItemKey);
      },
      right: [
        {
          text: 'Delete',
          component:(
            <View style={styles.swipeoutButton}>
              <Image source={imagePath} style={styles.swipeoutImage}/>
            </View>
          ),
          onPress: () => {
            DeleteActivityElement(props.text)
            setHeight(0);
          }
        }
      ],
      rowId: props.index,
      sectionId: 1,
      buttonWidth:60
    };

    return(
      <Swipeout {...swipeSettings} backgroundColor={'transparent'} style = {{height:height}}>
          <Text style = {styles.activityListText} onPress={props.onPress}> {props.text}</Text>
      </Swipeout>
    );

}

/*------------Helper function to delete activity from user and actibity db------------*/
//TODO
//Possibly make more generic
export function DeleteActivityElement(activityName) {

  var id = ""

  activitiesdb.loadDatabase( (err) => {
      if(err) throw err;

      activitiesdb.find({name: activityName}, function (err,docs) {
        id = docs[0]._id;
      });

      activitiesdb.remove({ name: activityName }, {}, function (err, numRemoved) {
      });


    });

  usersdb.loadDatabase( (err) => {
      if(err) throw err;
      //note this is hardcoded as I am unsure of how usersdb is to be used in future, should be
      //easy change however
      usersdb.update({ name: 'Matt' }, { $pull: { activities: id } }, {}, function () {
    });
  });

}

/*----------A scrollable list with optional on press of elements----------*/
export function ScrollBox(props) {

    const listData = props.list.map((l, index) => ({key: l, index:index}));
    const ItemComponent = props.component || SwipableListItem;
    return (
        <View style={[styles.container, props.style, {flex:1, flexDirection:'row'}]}>
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
                          ItemKey={item.key}
                          index={item.index}
                          src = 'x'
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
            width:200,borderColor: Colors.backAuxiliary, borderWidth: 3
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

/*----------Loading Wrapper----------*/
export function Loadable({ children, loaded }) {
    const [contentShown, setContentShown] = useState(true);

    useEffect( () => { //if still not loaded within a second, show loading symbol
        let timeout = null; 
        if(!loaded) {
            timeout = setTimeout( () => {
                setContentShown(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timeout);
            setContentShown(true);
        }
    }, [loaded]);


    return (contentShown) ? <View style={styles.container}>{children}</View> : <Loading />;
}

/*----------Loading visual----------*/
function Loading(props) {
    const [rotate, setRotate] = useState(new Animated.Value(0))

    Animated.loop(
        Animated.timing(
            rotate,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver:true,
            }
        )
    ).start();

    const rotation = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={styles.container}>
            <Animated.Image source={ImageSources["loading"]}
                   style={[styles.loadingIcon, {transform: [{rotate: rotation}]}]} />
        </View>
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
