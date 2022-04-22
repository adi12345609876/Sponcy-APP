import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Participants } from "../../../../Hooks/GlobalHooks";
import ThreeDots from "../../../../components/SuperComp/3dotComp";
import { CreatePosting, LeaveRoom } from "../../../../BACKEND/firebase";
import { async } from "@firebase/util";
import { useauth } from "../../../../BACKEND/Auth";
import { styles } from "../../../../Features/Styles";
import NameText from "../../../../components/SuperComp/Name";
import Constants from "expo-constants";

export default function AssetExample({ route }) {
  const currentuser = useauth();
  const navigation = useNavigation();

  const { name, icon, id, participants, owner, Leaders } = route.params;

  const participantsdetails = Participants(participants);

  const [visible, setvisible] = useState();

  async function RemoveFromGrp(Useruid) {
    await LeaveRoom(id, Useruid);
  }
  async function MakeLeader(Useruid) {
    await CreatePosting(id, Useruid, "Leader");
  }
  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      <TouchableOpacity
        style={[styles.Searchbox, { width: 40, marginLeft: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
      </TouchableOpacity>
      <View style={styles.ceneteredcontainer}>
        <Image
          source={{ uri: icon }}
          style={{
            height: 200,
            width: 200,
            borderRadius: 20,
            backgroundColor: Colors.grey,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <Text style={styles.Bigtext}>{name}</Text>
      </View>
      <Text style={{ fontWeight: "bold", fontsize: 15 }}>Participants:</Text>
      {participantsdetails?.map((item) => (
        <View>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              style={{
                top: 10,
                position: "relative",
                flexDirection: "row",
              }}
              onPress={() => setvisible(item.id)}
            >
              <Image
                source={{ uri: item?.PhotoURL }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 200,
                  marginHorizontal: 15,
                }}
              />
              <NameText name={item.UserName} />
              {item?.uid == owner ? (
                <Text style={[styles.Smalltext, { color: "red" }]}>Owner</Text>
              ) : (
                Leaders?.includes(item?.uid) && (
                  <Text style={[styles.Smalltext, { color: "green" }]}>
                    Leader
                  </Text>
                )
              )}
            </TouchableOpacity>
          </View>

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
