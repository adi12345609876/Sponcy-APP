import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//expo
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import HomeItem from "../../FlatlistItem/HomeItem";
import renderSeparator from "../../components/SuperComp/Separator";
//assets
// import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
import { ChatRooms, Usersforchat, OneOneMess } from "../../BACKEND/firebase";
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

  const RoomsrenderItem = ({ item }) => {
    //Todo include mesagesSearchFilter the same way we inluded filter for roomname and in return ( {mesagesSearchFilter ? <mesagesitem mes={item.messages} roomname> })
    const SearchFilter = item?.RoomName?.toLowerCase()?.includes(
      route?.params?.Searchtext?.toLowerCase()
    );

    return (
      <>
        {SearchFilter ? (
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
            owner={item.owner}
          />
        ) : route?.params?.Searchtext == undefined ? (
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
            owner={item.owner}
            Leaders={item.Leaders}
          />
        ) : null}
      </>
    );
  };

  const UsersrenderItem = ({ item }) => {
    const SearchFilter = item?.RoomName?.toLowerCase()?.includes(
      route?.params?.Searchtext?.toLowerCase()
    );
    return (
      <>
        {SearchFilter ? (
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
        ) : route?.params?.Searchtext == undefined ? (
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
        ) : null}
      </>
    );
  };
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
