import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Features/Features";
import Name from "../SuperComp/Name";
import { useNavigation } from "@react-navigation/native";
import ThreeDots from "../../components/SuperComp/3dotComp";
import { DeleteRoom, EditRoom } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";

export default function ChatHeader({ name, icon, id }) {
  const [threedotvisible, setthreevisible] = useState(false);
  const currentUser = useauth();
  const navigation = useNavigation();

  async function DeletingRoom() {
    await DeleteRoom(id);
    navigation.navigate("Tabs");
  }
  async function EditingRoom() {
    await EditRoom(id, "RoomName", "", "Participants", currentUser.uid);
    navigation.navigate("Tabs");
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
              source={icon}
              style={{ width: 50, height: 50, borderRadius: 200 }}
            />
          </TouchableOpacity>
          <View style={{ justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Name name={name} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ top: 50, position: "absolute", right: 20 }}>
          <ThreeDots
            visibility={threedotvisible}
            height={100}
            width={200}
            data={[
              { text: "Edit", icon: "pencil", func: () => EditingRoom() },
              {
                text: "Delete",
                icon: "trash-outline",
                func: () => DeletingRoom(),
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

const styles = StyleSheet.create({
  headercontainer: {
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    width: "100%",
    height: 90,
    elevation: 2,
  },

  logo: {
    height: 15,
    width: 15,
    marginLeft: 1,
    marginTop: 9,
  },
});
