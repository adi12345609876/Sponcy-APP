import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
//componets
import Notificationbutton from "../components/SuperComp/NotificationButton";
import NameText from "../components/SuperComp/Name";
import { Colors } from "../Features/Colors";
//assets
import { useNavigation } from "@react-navigation/native";

import { useauth } from "../BACKEND/Auth";
import { DeleteUnreadUser } from "../BACKEND/firebase";
import { styles } from "../Features/Styles";
import { Avatar } from "react-native-paper";

//features

const HomeItem = ({
  name,
  previousmessage,
  pinned,
  icon,
  id,
  participants,
  UnreadUsers,
  Type,
  Seen,
  Mess,
  Forwarded,
  Invite,
  InvitationData,
  owner,
  Leaders,
}) => {
  const curerntuser = useauth();
  const navigation = useNavigation();
  // const messages = OneOneChats(id);

  const notify =
    Type == "OneToOne" ? !Seen : UnreadUsers?.includes(curerntuser?.uid);

  function Handleclick() {
    if (Type == "OneToOne") {
      navigation.navigate("Chat", {
        name,
        icon,
        id,
        onechat: true,
        Type,
        Mess,
        Forwarded,
        Invite,
        InvitationData,
      });
    } else {
      navigation.navigate("Chat", {
        name,
        icon,
        id,
        participants,
        Mess,
        Forwarded,
        Invite,
        InvitationData,
        owner,
        Leaders,
      });
    }
    DeleteUnreadUser(id, curerntuser?.uid, Type);
  }
  return (
    <TouchableOpacity
      style={styles.homecontainer}
      onPress={() => Handleclick()}
    >
      <TouchableOpacity style={styles.imagecontainer}>
        <Avatar.Image
          size={50}
          source={{ uri: icon ? icon : null }}
          style={{ backgroundColor: "grey" }}
        />
        {/* <Image source={{ uri: icon ? icon : null }} style={styles.image} /> */}
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ maxWidth: 200 }}>
          <Text style={styles.itemText}>{name}</Text>

          <Text numberOfLines={1} style={styles.previousmessage}>
            {previousmessage}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        {notify && (
          <View style={[styles.end, { paddingRight: 5 }]}>
            <Notificationbutton />
          </View>
        )}
        <TouchableOpacity style={styles.end}>
          {pinned && <Octicons name="pin" size={15} color={Colors.grey} />}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HomeItem;
