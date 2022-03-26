import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Features";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Participants } from "../../../../Hooks/GlobalHooks";

export default function AssetExample({ route }) {
  const navigation = useNavigation();

  const { name, icon, id, participants } = route.params;

  const participantsdetails = Participants(participants);

  console.log("Participants:", participantsdetails);

  return (
    <View>
      <TouchableOpacity
        style={{ marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
      </TouchableOpacity>
      <Image
        source={icon}
        style={{ height: 40, width: 40, borderRadius: 200 }}
      />
      <Text>{name}</Text>
      <Text style={{ fontWeight: "bold", fontsize: 15 }}>Participants:</Text>
      {participantsdetails?.map((item) => (
        <View>
          <Text>{item.UserName}</Text>
          <Image
            source={item.PhotoURL}
            style={{ height: 40, width: 40, borderRadius: 200 }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
