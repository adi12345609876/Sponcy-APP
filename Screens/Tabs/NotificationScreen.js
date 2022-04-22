import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import NotifyItem from "../../FlatlistItem/NotifyItem";
import renderSeparator from "../../components/SuperComp/Separator";
import { ChatRooms, OneOneMess, Usersforchat } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { getUserDetailsCollection } from "../../BACKEND/Announce";
//assets
import { styles } from "../../Features/Styles";

//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

export default function AssetExample({ navigation }) {
  const currentuser = useauth();
  const Rooms = ChatRooms();
  const OnetoOne = OneOneMess(currentuser?.uid);
  const userdetails = getUserDetailsCollection(currentuser?.uid);
  const AllUsers = Usersforchat();
  function compare2arrays(Bigarray, Smallarray) {
    // const [Details, setDetails] = useState();
    // if (Smallarray) {
    //   Smallarray?.then((doc) => {
    //     setDetails(doc);
    //   });
    // }
    // const m = Details?.Following;

    //filter user
    const filtered = Bigarray?.filter((users) => {
      return Smallarray?.Following?.includes(users?.id);
    });

    return filtered;
  }
  const DetailsUserData = compare2arrays(AllUsers, userdetails);

  //render
  const renderItem = ({ item }) => (
    <NotifyItem
      name={item.RoomName}
      icon={item.icon}
      previousmessage={item.LastMessage}
      UnreadUsers={item.UnreadUsers}
      id={item.id}
    />
  );
  const UserrenderItem = ({ item }) => (
    <NotifyItem
      name={item.UserName}
      icon={item?.PhotoURL}
      UnreadSeenUsers={item.UnseenUsers}
      id={item.id}
      participants={item.Participants}
    />
  );
  const OnetoOnerenderItem = ({ item }) => (
    <NotifyItem
      name={item.RoomName}
      icon={item.icon}
      LastMessage={item.LastMessage}
      Seen={item.Seen}
      id={item.id}
      Type={item.Type}
    />
  );
  return (
    <AnimatedScroolView>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <FlatList
          data={Rooms}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <View>
              <Text>No Notification</Text>
            </View>
          )}
        />
        <FlatList
          data={DetailsUserData}
          renderItem={UserrenderItem}
          keyExtractor={(item) => item.id}
        />
        <FlatList
          data={OnetoOne}
          renderItem={OnetoOnerenderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </AnimatedScroolView>
  );
}
