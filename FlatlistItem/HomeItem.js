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
  icon,
  previousmessage,
  id,
  participants,
  UnreadUsers,
  Seen,
  Mess,
  owner,
  Leaders,
}) => {
  const curerntuser = useauth();
  const navigation = useNavigation();

  const notify = UnreadUsers?.includes(curerntuser?.uid);

  function Handleclick() {
    navigation.navigate("Chat", {
      name,
      icon,
      id,
      participants,
      Mess,
      owner,
      Leaders,
    });

    DeleteUnreadUser(id, curerntuser?.uid);
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
          style={{ backgroundColor: Colors.grey }}
        />
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
      </View>
    </TouchableOpacity>
  );
};

export default HomeItem;
