import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import ChatHeader from "../../../../components/Chat/ChatHeader";
import { ChatBottom } from "../../../../components/Chat/ChatBottom";
import ChatCenter from "../../../../components/Chat/ChatCenter";
import { OneOneChats, PrivateChats } from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import image from "../../../../assets/Photos/BGC.png";
import { styles } from "../../../../Features/Styles";

export default function AssetExample({ route }) {
  const {
    name,
    icon,
    id,
    participants,
    onechat,
    Type,
    Mess,
    Forwarded,
    Invite,
    InvitationData,
    owner,
    Leaders,
    Sponsor,
  } = route.params;
  const messages = onechat ? OneOneChats(id) : PrivateChats(id);

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ height: "100%", width: "100%" }}
    >
      <ChatHeader
        name={name}
        icon={icon}
        id={id}
        participants={participants}
        Type={Type}
        owner={owner}
        Leaders={Leaders}
      />

      <ScrollView style={{ marginBottom: 50 }}>
        <ChatCenter
          messages={messages}
          roomid={id}
          Type={Type}
          Invite={Invite}
          owner={owner}
        />
      </ScrollView>

      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <ChatBottom
          roomid={id}
          participants={participants}
          name={name}
          icon={icon}
          onechat={onechat}
          Type={Type}
          Mess={Mess}
          Forwarded={Forwarded}
          Invite={Invite}
          InvitationData={InvitationData}
          Sponsor={Sponsor}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
