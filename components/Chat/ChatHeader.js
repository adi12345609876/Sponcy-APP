import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";
import Name from "../SuperComp/Name";
import { useNavigation } from "@react-navigation/native";
import ThreeDots from "../../components/SuperComp/3dotComp";
import { LeaveRoom, EditRoom } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { styles } from "../../Features/Styles";

export default function ChatHeader({
  name,
  icon,
  id,
  participants,
  Type,
  owner,
  Leaders,
}) {
  const [threedotvisible, setthreevisible] = useState(false);
  const currentUser = useauth();
  const navigation = useNavigation();

  async function LeaveRooms() {
    await LeaveRoom(id, currentUser?.uid);
    navigation.navigate("Tabs", {
      screen: "Announce",
    });
  }
  async function InvitingRoom() {
    navigation.navigate("HomeChat", {
      Invite: true,
      InvitationData: { id: id, RoomName: name, RoomIcon: icon },
    });
  }
  async function EditingRoom() {
    navigation.navigate("EditRooms", { name, icon, id, participants });
  }
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
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={{ uri: icon }}
              style={{ width: 50, height: 50, borderRadius: 200 }}
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
              <Name name={name} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 10, position: "absolute", right: 20 }}>
          <ThreeDots
            visibility={threedotvisible}
            height={100}
            width={200}
            data={[
              { text: "Edit", icon: "pencil", func: () => EditingRoom() },
              {
                text: "Leave",
                icon: "arrow-back-circle",
                func: () => LeaveRooms(),
              },
              Type != "OneToOne" && {
                text: "Invite",
                icon: "arrow-forward-circle",
                func: () => InvitingRoom(),
              },
            ]}
          />
        </View>
        <TouchableOpacity
          style={{ top: 10, position: "relative" }}
          onPress={() => setthreevisible(!threedotvisible)}
        >
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}
