import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../BACKEND/Auth";
import { styles } from "../../Features/Styles";
import { Avatar } from "react-native-paper";
import { SuperIcons } from "../SuperComp/SuperComp";

export default function ChatHeader({
  name,
  icon,
  id,
  participants,
  owner,
  Leaders,
}) {
  const currentUser = useauth();
  const navigation = useNavigation();

  function MoveToDetails() {
    navigation.navigate("RoomDetails", {
      name,
      icon,
      id,
      participants,
      owner,
      Leaders,
    });
  }
  return (
    <>
      <View style={styles.headercontainer}>
        <View style={{ top: 10, flexDirection: "row" }}>
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ margin: 10 }}
            onPress={() =>
              navigation.navigate("SuperContainerImage", {
                photo: icon,
              })
            }
          >
            <Avatar.Image
              size={50}
              source={{ uri: icon ? icon : null }}
              style={{ backgroundColor: Colors.grey }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                flexDirection: "row",
              }}
              onPress={() => MoveToDetails()}
            >
              <Text
                style={{
                  flexWrap: "wrap",
                  fontSize: 20,
                  paddingRight: 5,
                  fontWeight: "700",
                  color: Colors.black,
                  flexShrink: 1,
                  maxWidth: 200,
                }}
                numberOfLines={1}
              >
                {name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{ top: 10, position: "relative" }}
          onPress={() => {
            navigation.navigate("EditRooms", { name, icon, id, participants });
          }}
        >
          <SuperIcons name="Pencil-Edit" size={40} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </>
  );
}
