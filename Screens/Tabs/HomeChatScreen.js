import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
//expo
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import HomeItem from "../../FlatlistItem/HomeItem";
import renderSeparator from "../../components/SuperComp/Separator";
//assets
// import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
import { ChatRooms, Usersforchat, updatedb } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import UsersItem from "../../FlatlistItem/UsersHomeItem";
//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
//data
// const DummyData = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     person: "Adinath",
//     profile: null,
//     pinned: true,
//     notifications: "1",
//     previousmessage: "hello there",
//   },
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-5af53fgvb234a",
//     person: "Netflix",
//     profile: DummyNetflixIcon,
//     pinned: false,
//     notifications: "20",
//     previousmessage: "welcome to sponcy is a long text",
//   },
// ];
//render

const RoomsrenderItem = ({ item }) => (
  <HomeItem
    name={item.RoomName}
    // pinned={item.pinned}
    icon={item.icon}
    notifications={item.notifications}
    previousmessage={item.LastMessage}
    id={item.id}
  />
);
const UsersrenderItem = ({ item }) => (
  <UsersItem
    name={item.UserName}
    // pinned={item.pinned}
    icon={item.PhotoURL}
    // notifications={item.notifications}
    // previousmessage={item.LastMessage}
    // id={item.id}
  />
);
export default function AssetExample() {
  const dbupdator = updatedb();
  // dbupdator?.map((a) => console.log(a));
  const currentuser = useauth();
  // const ChatData = PrivateChats();
  const Rooms = ChatRooms();
  const ChatUser = Usersforchat();
  Rooms?.map((room) => console.log(room?.Participants));
  // ChatUser?.map((Users) =>
  //   console.log("UsersName:", Users?.UserName, "Photo:", Users?.PhotoURL)
  // );
  // const filtered = ChatUser?.filter((users) => users == currentuser?.uid);
  // console.log("FILTERED:", filtered);

  return (
    <AnimatedScroolView>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        {/* <Text>Organisations</Text> */}
        <FlatList
          data={Rooms}
          renderItem={RoomsrenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
        {/* <Text>Peoples</Text> */}

        {/* <FlatList
        data={ChatUser}
        renderItem={UsersrenderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
      /> */}
      </View>
    </AnimatedScroolView>
  );
}
//style
const styles = StyleSheet.create({});
