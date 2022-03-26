import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//expo
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import HomeItem from "../../FlatlistItem/HomeItem";
import renderSeparator from "../../components/SuperComp/Separator";
//assets
// import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
import {
  ChatRooms,
  Usersforchat,
  updatedb,
  OneOneMess,
} from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import UsersItem from "../../FlatlistItem/UsersHomeItem";
//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

export default function AssetExample({ route }) {
  const { message, Forwarded, Invite, InvitationData } = route.params;
  const currentuser = useauth();
  const Rooms = ChatRooms();
  const OnetoOne = OneOneMess(currentuser?.uid);
  console.log("ONENOET", OnetoOne);
  // Rooms?.map((room) => console.log("rooms:", room));

  const RoomsrenderItem = ({ item }) => (
    <HomeItem
      name={item.RoomName}
      // pinned={item.pinned}
      icon={item.icon}
      previousmessage={item.LastMessage}
      id={item.id}
      participants={item.Participants}
      UnreadUsers={item.UnreadUsers}
      Mess={message}
      Forwarded={Forwarded}
      Invite={Invite}
      InvitationData={InvitationData}
    />
  );
  const UsersrenderItem = ({ item }) => (
    <HomeItem
      name={item.RoomName}
      // pinned={item.pinned}
      icon={item.icon}
      previousmessage={item.LastMessage}
      id={item.id}
      Type={item.Type}
      Seen={item.Seen}
      Mess={message}
      Forwarded={Forwarded}
      Invite={Invite}
      InvitationData={InvitationData}
      // participants={item.Participants}
      // UnreadUsers={item.UnreadUsers}
    />
  );
  return (
    <AnimatedScroolView>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <Text>Organisations</Text>
        <FlatList
          data={Rooms}
          renderItem={RoomsrenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
        <Text>Peoples</Text>

        <FlatList
          data={OnetoOne}
          renderItem={UsersrenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </AnimatedScroolView>
  );
}
//style
const styles = StyleSheet.create({});
