import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import ChatItem from "../../FlatlistItem/ChatItem";
import image from "../../assets/Photos/BGC.png";
import { Colors } from "../../Features/Features";
import { useauth } from "../../BACKEND/Auth";
import { DeleteUnreadUserOnMess } from "../../BACKEND/firebase";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";

export default function App({ messages, roomid, Type, Invite }) {
  const ScroolRef = useRef();
  const currentuser = useauth();
  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);

    return (
      <ChatItem
        message={item.text}
        From={item.From}
        Forwarded={item.Forwarded}
        time={Time?.time}
        id={item.id}
        roomid={roomid}
        Type={Type}
        Invite={item.Invite}
        Invitationid={item.Invitationid}
      />
    );
  };
  useEffect(() => {
    DeleteUnreadUserOnMess(roomid, currentuser?.uid, Type);
    setTimeout(() => {
      ScroolRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [messages]);

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View ref={ScroolRef}></View>
    </View>
  );
}
