import React, { useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import ChatItem from "../../FlatlistItem/ChatItem";
import { useauth } from "../../BACKEND/Auth";
import { DeleteUnreadUserOnMess } from "../../BACKEND/firebase";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

export default function App({ messages, roomid, owner }) {
  const ScroolRef = useRef();
  const currentuser = useauth();
  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);

    return (
      <ChatItem
        message={item.text}
        From={item.From}
        time={Time?.time}
        id={item.id}
        roomid={roomid}
        Name={item.Name}
        PhotoURL={item.PhotoURL}
        owner={owner}
      />
    );
  };
  useEffect(() => {
    DeleteUnreadUserOnMess(roomid, currentuser?.uid);
    setTimeout(() => {
      try {
        ScroolRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } catch (error) {
        console.log(error);
      }
    }, 100);
  }, [messages]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </TouchableWithoutFeedback>
      <View ref={ScroolRef}></View>
    </View>
  );
}
