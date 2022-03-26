import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import NotifyItem from "../../FlatlistItem/NotifyItem";
import renderSeparator from "../../components/SuperComp/Separator";
import { ChatRooms, OneOneMess } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
//assets

//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

//render
const renderItem = ({ item }) => (
  <NotifyItem
    name={item.RoomName}
    // checked={item.checked}
    icon={item.icon}
    // notifications={item.notifications}
    previousmessage={item.LastMessage}
    UnreadUsers={item.UnreadUsers}
    id={item.id}
    participants={item.Participants}
  />
);

export default function AssetExample({ navigation }) {
  const currentuser = useauth();
  const Rooms = ChatRooms();
  const OnetoOne = OneOneMess(currentuser?.uid);
  OnetoOne?.map((r) => console.log("RRRR", r));
  console.log("ONENOET", OnetoOne);

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
          data={Rooms}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </AnimatedScroolView>
  );
}

const styles = StyleSheet.create({});
