import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//expo
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import HomeItem from "../../FlatlistItem/HomeItem";
import renderSeparator from "../../components/SuperComp/Separator";
//assets

import { ChatRooms, OneOneMess } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { styles } from "../../Features/Styles";
import { color } from "react-native-elements/dist/helpers";
import { Colors } from "../../Features/Colors";
//features

export default function AssetExample({ route }) {
  const { message, Forwarded, Invite, InvitationData } = route.params;

  const currentuser = useauth();
  const Rooms = ChatRooms();
  const OnetoOne = OneOneMess(currentuser?.uid);

  const RoomsrenderItem = ({ item }) => {
    return (
      <>
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
      </>
    );
  };

  const UsersrenderItem = ({ item }) => {
    return (
      <>
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
        <Text style={[styles.Smalltext, { textAlign: "left" }]}>
          Organisations
        </Text>
        <FlatList
          data={Rooms}
          renderItem={RoomsrenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
        <Text style={[styles.Smalltext, { textAlign: "left" }]}>Peoples</Text>

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
