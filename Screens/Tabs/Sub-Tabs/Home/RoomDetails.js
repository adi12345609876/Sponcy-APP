import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Colors } from "../../../../Features/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Participants } from "../../../../Hooks/GlobalHooks";
import ThreeDots from "../../../../components/SuperComp/3dotComp";
import { CreatePosting, LeaveRoom } from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import { deviceWidth, styles } from "../../../../Features/Styles";
import NameText from "../../../../components/SuperComp/Name";
import Constants from "expo-constants";
import { Avatar } from "react-native-paper";
import { SuperIcons } from "../../../../components/SuperComp/SuperComp";

export default function AssetExample({ route }) {
  const currentuser = useauth();
  const navigation = useNavigation();

  const { name, icon, id, participants, owner, Leaders } = route.params;

  const participantsdetails = Participants(participants);

  const [visible, setvisible] = useState(false);

  async function RemoveFromGrp(Useruid) {
    await LeaveRoom(id, Useruid);
  }
  async function MakeLeader(Useruid) {
    await CreatePosting(id, Useruid, "Leader");
  }

  return (
    <ScrollView>
      <SafeAreaView style={{ marginTop: Constants.statusBarHeight }}>
        <TouchableOpacity
          style={[styles.Searchbox, { width: 40, marginLeft: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.ceneteredcontainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SuperContainerImage", {
                photo: icon,
              })
            }
          >
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
          </TouchableOpacity>

          <Text style={[styles.Bigtext, { color: Colors.darkgrey }]}>
            {name}
          </Text>
        </View>

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
                <Avatar.Image
                  source={{ uri: item?.PhotoURL ? item?.PhotoURL : null }}
                  size={40}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 200,
                    marginHorizontal: 15,
                    backgroundColor: Colors.grey,
                  }}
                />

                <NameText name={item.UserName} />
                {item?.id == owner ? (
                  <Text style={[{ color: "red" }]}>Owner</Text>
                ) : (
                  Leaders?.includes(item?.id) && (
                    <Text style={[styles.Smalltext, { color: "green" }]}>
                      Leader
                    </Text>
                  )
                )}
              </TouchableOpacity>
            </View>

            <View style={{ top: 10, position: "absolute", left: 20 }}>
              <ThreeDots
                setvisibility={setvisible}
                visibility={visible == item.id}
                height={100}
                width={200}
                data={[
                  {
                    text: "go to Profile",
                    icon: "Peoples",
                    func: () =>
                      navigation.navigate("Portfolio", { useruid: item?.id }),
                  },
                  currentuser?.id == owner && {
                    text: "Remove",
                    icon: "Trash",
                    func: () => RemoveFromGrp(item.id),
                  },
                  currentuser?.uid == owner && {
                    text: "Make Leader",
                    icon: "Invite",
                    func: () => MakeLeader(item.id),
                  },
                ]}
              />
            </View>
          </View>
        ))}
        <View
          style={{
            width: deviceWidth,
            height: 1,
            backgroundColor: Colors.darkgrey,
            marginTop: 50,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => {
              LeaveRoom(id, currentuser?.uid);
              navigation.navigate("MyDrawer", {
                screen: "Tabs",
              });
            }}
          >
            <SuperIcons name="Logout" size={40} color="red" />
            <Text
              style={[styles.Smalltext, { color: Colors.red, marginLeft: 20 }]}
            >
              Leave
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
            onPress={() =>
              navigation.navigate("EditRooms", { name, icon, id, participants })
            }
          >
            <SuperIcons name="Edit" size={40} color={Colors.green} />
            <Text
              style={[
                styles.Smalltext,
                { color: Colors.green, marginLeft: 20 },
              ]}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
