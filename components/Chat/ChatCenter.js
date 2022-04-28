import React, { useEffect, useRef } from "react";
import { View, FlatList } from "react-native";
import ChatItem from "../../FlatlistItem/ChatItem";
import { useauth } from "../../BACKEND/Auth";
import { DeleteUnreadUserOnMess } from "../../BACKEND/firebase";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";
import { styles } from "../../Features/Styles";

export default function App({ messages, roomid, Type, Invite, owner }) {
  const ScroolRef = useRef();
  const currentuser = useauth();
  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);
    // const Time = TimestamptoTime(item?.time);

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
        DocType={item.Type}
        PhotoURL={item.PhotoURL}
        Name={item.Name}
        Size={item.Size}
        owner={owner}
      />
    );
  };
  useEffect(() => {
    DeleteUnreadUserOnMess(roomid, currentuser?.uid, Type);
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
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View ref={ScroolRef}></View>
    </View>
  );
}
