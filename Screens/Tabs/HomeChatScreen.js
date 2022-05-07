import React from "react";
import { View } from "react-native";
//expo
//components
import HomeItem from "../../FlatlistItem/HomeItem";
import renderSeparator from "../../components/SuperComp/Separator";
//assets
import { ChatRooms, OneOneMess } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import AnimatedFlatList from "../../components/Animation/AnimatedFlatList";
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
          icon={item.icon}
          previousmessage={item.LastMessage}
          id={item.id}
          participants={item.Participants}
          UnreadUsers={item.UnreadUsers}
          Mess={message}
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
          icon={item.icon}
          previousmessage={item.LastMessage}
          id={item.id}
          Type={item.Type}
          Seen={item.Seen}
          Mess={message}
          Forwarded={Forwarded}
          Invite={Invite}
          InvitationData={InvitationData}
        />
      </>
    );
  };

  return (
    <View>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <AnimatedFlatList
          data={Rooms}
          renderItem={RoomsrenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          listEmptyComponent={() => {}}
        />

        <AnimatedFlatList
          data={OnetoOne}
          renderItem={UsersrenderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </View>
  );
}
