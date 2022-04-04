import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Features";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Participants } from "../../../../Hooks/GlobalHooks";
import ThreeDots from "../../../../components/SuperComp/3dotComp";
import { CreatePosting, LeaveRoom } from "../../../../BACKEND/firebase";
import { async } from "@firebase/util";
import { useauth } from "../../../../BACKEND/Auth";

export default function AssetExample({ route }) {
  const currentuser = useauth();
  const navigation = useNavigation();

  const { name, icon, id, participants, owner, Leaders } = route.params;

  const participantsdetails = Participants(participants);

  const [visible, setvisible] = useState();

  console.log("Participants:", participantsdetails, "owner", owner);
  // console.log(participantsdetails?.uid == owner);
  async function RemoveFromGrp(Useruid) {
    await LeaveRoom(id, Useruid);
  }
  async function MakeLeader(Useruid) {
    await CreatePosting(id, Useruid, "Leader");
  }
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
          <Image
            source={item.PhotoURL}
            style={{ height: 40, width: 40, borderRadius: 200 }}
          />

          <TouchableOpacity
            style={{ top: 10, position: "relative" }}
            onPress={() => setvisible(item.id)}
          >
            <Text>{item.UserName}</Text>
          </TouchableOpacity>
          {item?.uid == owner ? (
            <Text>Owner</Text>
          ) : (
            Leaders.includes(item?.uid) && <Text>Leader</Text>
          )}

          <View style={{ top: 10, position: "absolute", right: 20 }}>
            <ThreeDots
              visibility={visible == item.id}
              height={100}
              width={200}
              data={[
                currentuser?.uid == owner && {
                  text: "Remove",
                  icon: "trash",
                  func: () => RemoveFromGrp(item.id),
                },
                currentuser?.uid == owner && {
                  text: "Make Leader",
                  icon: "add-circle-outline",
                  func: () => MakeLeader(item.id),
                },
              ]}
            />
          </View>

          {/* <Entypo name="dots-three-vertical" size={20} color="black" /> */}
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
