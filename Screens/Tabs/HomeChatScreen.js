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
      <Text style={styles.Smalltext}>
        This screen is still under development so if you want to give review and
        feedback send it to
      </Text>
      <Text style={[styles.Smalltext, { color: "blue" }]}>
        perfectsmooth22@gmail.com"
      </Text>

      <View
        style={{
          marginBottom: 100,
        }}
      >
        <Text>Organisations</Text>
        {/* <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        /> */}
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
