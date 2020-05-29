/*==========List/Scrollable Related Component Content==========*/

/*----------Imports----------*/
import React, {useState, useEffect} from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles, {Colors, width} from "../styles.js";
import { useNavigation } from '@react-navigation/native';
import { activitiesdb, usersdb } from "../DB.js";
import { ImageSources, DisplayWrapper } from "../HelperUI.js";
import Swipeout from 'react-native-swipeout';

/*----------A basic standard for list components----------*/
/* Motivated by scroll component generically passing text as a prop */
function BasicListItem(props) {
    return <Text {...props}> {props.text} </Text>;
}

export function DropDownListItem(props) {

  const [visibility, setVisibility] = useState (false);

  const wrappedElement = (
      <View>
        <Text style = {[styles.activityListText, {padding:2}]}>Example drop down text</Text>
      </View>
  )

  const toggleDropDown = () => {
      setVisibility(!visibility);
      console.log(visibility);
  }

  return (
    <View style = {styles.container}>
      <View style = {styles.container}>
        <Text style = {styles.activityListText} onPress={() => {toggleDropDown()}}> {props.text}</Text>
      </View>
      <DisplayWrapper children = {wrappedElement} visibility = {visibility}/>
    </View>
  )
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
    const image1Path = (props.src1) ? ImageSources[props.src1] : null;
    const image2Path = (props.src2) ? ImageSources[props.src2] : null;


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
            <View style={styles.addGoalSwipeoutButton}>
              <Image source={image2Path} style={styles.swipeoutImage}/>
            </View>
          ),
          onPress: () => {

          }
        },
        {
          text:'Goal',
          component: (
            <View style={styles.deleteSwipeoutButton}>
              <Image source={image1Path} style={styles.swipeoutImage}/>
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
      //note this is hardcoded for a single user in userdatabase
      usersdb.update({}, { $pull: { activities: id } }, {}, function () {
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
                          src1 = 'x'
                          src2 = 'whitePlus'
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
