import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
//componets

import Notificationbutton from "../components/SuperComp/NotificationButton";
import NameText from "../components/SuperComp/Name";
import { Colors } from "../Features/Colors";
//assets
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Features/Styles";

//features

const HomeItem = ({
  name,
  previousmessage,
  pinned,
  icon,
  notifications,
  id,
  participants,
}) => {
  const navigation = useNavigation();
  function Handleclick() {
    navigation.navigate("Chat", {
      name,
      icon,
      id,
      participants,
    });
  }
  return (
    <TouchableOpacity
      style={styles.UsersHomecontainer}
      onPress={() => Handleclick()}
    >
      <TouchableOpacity style={styles.imagecontainer}>
        <Image source={{ uri: icon ? icon : null }} style={styles.image} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ maxWidth: 200 }}>
          <NameText name={name} />
          <Text numberOfLines={1} style={styles.previousmessage}>
            {previousmessage}
          </Text>
        </View>
      </View>
      <View style={styles.right}>
        {notifications && (
          <View style={[styles.end, { paddingRight: 5 }]}>
            <Notificationbutton number={notifications} />
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
