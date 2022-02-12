import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Colors } from "../Features/Features";
import ChatHeader from "../Components2/ChatHeader";
import { ChatBottom } from "../Components2/ChatBottom";
import ChatCenter from "../Components2/ChatCenter";
import { PrivateChats } from "../BACKEND/firebase";
export default function AssetExample({ route }) {
  const { name, icon, id } = route.params;
  // console.log(id);
  // messages?.map((message) => {
  //   console.log(message.text);
  // });

  const messages = PrivateChats(id);

  return (
    <>
      <ChatHeader name={name} icon={icon} />
      <View
        style={{
          backgroundColor: Colors.white,
          height: "100%",
          width: "100%",
        }}
      >
        <ChatCenter messages={messages} />

        <SafeAreaView style={styles.bottomcontainer}>
          <ChatBottom roomid={id} />
        </SafeAreaView>
      </View>
    </>
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
