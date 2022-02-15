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
import { PrivateChats } from "../../../../BACKEND/firebase";
import image from "../../../../assets/Photos/BGC.png";
import ThreeDots from "../../../../components/SuperComp/3dotComp";

export default function AssetExample({ route }) {
  const { name, icon, id } = route.params;
  // console.log(id);
  // messages?.map((message) => {
  //   console.log(message.text);
  // });

  const messages = PrivateChats(id);

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ height: "100%", width: "100%" }}
    >
      <ChatHeader name={name} icon={icon} id={id} />

      <ScrollView style={{ marginBottom: 50 }}>
        <ChatCenter messages={messages} />
      </ScrollView>

      <SafeAreaView style={styles.bottomcontainer}>
        <ChatBottom roomid={id} />
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
