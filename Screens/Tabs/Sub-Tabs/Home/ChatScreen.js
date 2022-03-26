import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Colors } from "../../../../Features/Features";
import ChatHeader from "../../../../components/Chat/ChatHeader";
import { ChatBottom } from "../../../../components/Chat/ChatBottom";
import ChatCenter from "../../../../components/Chat/ChatCenter";
import { OneOneChats, PrivateChats } from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import image from "../../../../assets/Photos/BGC.png";
import ThreeDots from "../../../../components/SuperComp/3dotComp";

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
  } = route.params;
  const currentuser = useauth();
  const messages = onechat ? OneOneChats(id) : PrivateChats(id);
  console.log("Mess:", messages);

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
      />

      <ScrollView style={{ marginBottom: 50 }}>
        <ChatCenter
          messages={messages}
          roomid={id}
          Type={Type}
          Invite={Invite}
        />
      </ScrollView>

      <SafeAreaView style={styles.bottomcontainer}>
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
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bottomcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
