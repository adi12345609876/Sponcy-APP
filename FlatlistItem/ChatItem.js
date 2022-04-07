import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Time from "../components/SuperComp/time";
import { Colors } from "../Features/Colors";
import { useauth } from "../BACKEND/Auth";
import ThreeDots from "../components/SuperComp/3dotComp";
import { deleteDoc, doc } from "firebase/firestore";
import { db, JoinUser, SpecifiedUserData } from "../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useLoading } from "../Hooks/LoadingContext";
import { styles } from "../Features/Styles";

export default function ChatItem({
  message,
  From,
  Forwarded,
  time,
  id,
  roomid,
  Type,
  Invite,
  Invitationid,
  owner,
  DocType,
  PhotoURL,
  Name,
  Size,
}) {
  const navigation = useNavigation();
  const currentuser = useauth();
  const Specificuserdata = SpecifiedUserData(From);
  const { setshowLoading, showLoading } = useLoading();

  async function DeleteMessage(id) {
    setshowLoading(true);

    const Doclocation = doc(
      db,
      "Users",
      currentuser?.uid,
      "OneOneChat",
      roomid,
      "Messages",
      id
    );
    const Doclocation2 = doc(db, "Private-Chat", roomid, "Messages", id);
    if (Type == "OneToOne") {
      await deleteDoc(Doclocation);
    } else {
      await deleteDoc(Doclocation2);
    }
    setshowLoading(false);
  }
  function ForwardMessage() {
    navigation.navigate("HomeChat", {
      message,
      Forwarded: true,
    });
  }
  async function JoinInvited() {
    await JoinUser(Invitationid, currentuser?.uid);
  }

  const [threedotvisible, setthreevisible] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onLongPress={() => setthreevisible(true)}
        onPress={() => {
          setthreevisible(false);
        }}
      >
        <View
          style={From == currentuser?.uid ? styles.sending : styles.reciving}
        >
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 10,
              color:
                From == currentuser?.uid ? Colors.primary : Colors.secondary,
              fontWeight: "600",
            }}
          >
            {Specificuserdata?.UserName}
          </Text>
          <Text style={styles.text}>{message}</Text>
          {Invite && (
            <TouchableOpacity
              onPress={() => JoinInvited()}
              style={{ alignItems: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 30,
                  fontWeight: "400",
                  fontStyle: "normal",
                  color: Colors.secondary,
                  textAlign: "center",
                }}
              >
                Join
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ position: "absolute", bottom: 0, right: 10 }}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.time}>{Forwarded ? "Forwarded" : null}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ top: 50, position: "absolute", right: 20 }}>
        <ThreeDots
          visibility={threedotvisible}
          height={100}
          width={200}
          data={[
            {
              text: "Forward",
              icon: "md-return-up-forward-outline",
              func: () => ForwardMessage(),
            },
            currentuser?.uid == owner
              ? {
                  text: "Delete",
                  icon: "trash-outline",
                  func: () => DeleteMessage(id),
                }
              : currentuser?.uid == From && {
                  text: "Delete",
                  icon: "trash-outline",
                  func: () => DeleteMessage(id),
                },
          ]}
        />
      </View>
    </View>
  );
}
