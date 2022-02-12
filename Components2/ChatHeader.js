import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "../Features/Features";
import Name from "../components/Name";
import { useNavigation } from "@react-navigation/native";
import ThreeDots from "../Components2/3dotComp";

export default function ChatHeader({ name, icon }) {
  const [threedotvisible, setthreevisible] = useState(false);

  const navigation = useNavigation();
  const data2 = {
    name: "Delete",
    icon: "trash-outline",
    id: "1chatheader",
  };
  const data1 = {
    name: "Edit",
    icon: "pencil",
    id: "2chatheader",
  };

  return (
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
            {/* <Image style={styles.logo} source={CheckCircle} /> */}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{ top: 10, position: "relative" }}
        onPress={() => setthreevisible(!threedotvisible)}
      >
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>

      <View style={{ top: 75, position: "absolute", right: 15 }}>
        <ThreeDots
          visibility={threedotvisible}
          height={100}
          width={200}
          data2={data2}
          data1={data1}
        />
      </View>
    </View>
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
