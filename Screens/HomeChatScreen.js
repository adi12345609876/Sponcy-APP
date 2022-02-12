import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
//expo
//components
import AnimatedScroolView from "../components/AnimatedScroolTab";
import HomeItem from "../FlatlistItem/HomeItem";
import renderSeparator from "../components/Separator";
//assets
import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
import { ChatRooms, useauth } from "../BACKEND/firebase";

//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

//data
const DummyData = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    person: "Adinath",
    profile: null,
    pinned: true,
    notifications: "1",
    previousmessage: "hello there",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-5af53fgvb234a",
    person: "Netflix",
    profile: DummyNetflixIcon,
    pinned: false,
    notifications: "20",
    previousmessage: "welcome to sponcy is a long text",
  },
];
//render
const renderItem = ({ item }) => (
  <HomeItem
    name={item.RoomName}
    // pinned={item.pinned}
    icon={item.icon}
    notifications={item.notifications}
    previousmessage={item.LastMessage}
    id={item.id}
  />
);
export default function AssetExample() {
  const currentuser = useauth();
  // const ChatData = PrivateChats();
  const Rooms = ChatRooms();
  Rooms?.map((room) => console.log(room?.Participants));
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
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </AnimatedScroolView>
  );
}
//style
const styles = StyleSheet.create({});
