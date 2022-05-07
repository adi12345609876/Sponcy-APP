import React from "react";
import { SafeAreaView, View, ImageBackground } from "react-native";
import ChatHeader from "../../../../components/Chat/ChatHeader";
import { ChatBottom } from "../../../../components/Chat/ChatBottom";
import ChatCenter from "../../../../components/Chat/ChatCenter";
import { PrivateChats } from "../../../../BACKEND/firebase";
import image from "../../../../assets/Photos/BGC.png";

export default function AssetExample({ route }) {
  const { name, icon, id, participants, owner, Leaders } = route.params;
  const messages = PrivateChats(id);

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
        owner={owner}
        Leaders={Leaders}
      />

      <View style={{ marginBottom: 150 }}>
        <ChatCenter messages={messages} roomid={id} owner={owner} />
      </View>

      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
      >
        <ChatBottom roomid={id} participants={participants} />
      </SafeAreaView>
    </ImageBackground>
  );
}
