import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

//componets
import NameText from "../components/SuperComp/Name";
// import Time from "../components/SuperComp/time";

//assets
import { styles } from "../Features/Styles";

// import CheckCircle from "../assets/Photos/icons/CheckCircle.png";
//features
import { Colors } from "../Features/Colors";
import { useauth } from "../BACKEND/Auth";
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
import { DeleteUnreadUser, MakeNotifiesSeen } from "../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { RemoveUnseenUsers } from "../BACKEND/Announce";
import Time from "../components/SuperComp/time";
import { SafeAreaView } from "react-native";
import { Divider } from "react-native-paper";

const NotifyItem = ({ Type, message, url, id, Seen, TotalNotifies }) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const currentuser = useauth();
  // const notify =Type == "OneToOne" ? !Seen : UnreadUsers?.includes(currentuser?.uid);

  function Handleclick() {
    if (Type == "Hire") {
      MakeNotifiesSeen(currentuser?.uid, id);
      navigation.navigate("Portfolio", {
        useruid: url,
      });
    }
  }
  // function HandleclickAnnounce() {
  // RemoveUnseenUsers(currentuser?.uid, id);
  //   navigation.navigate("Portfolio", {
  //     useruid: id,
  //   });
  // }
  return (
    <SafeAreaView style={{ marginTop: 10 }}>
      {/* {notify && ( */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          // marginVertical: 1,
          // padding: 20,
          backgroundColor: Seen ? Colors.grey : "red",
          justifyContent: "flex-start",
          opacity: Seen ? 0.5 : null,
        }}
        onPress={() => Handleclick()}
      >
        <View
          style={{
            flexDirection: "column",
            height: 100,
            justifyContent: "center",
          }}
        >
          <Text style={styles.itemText}>
            {Type == "Hire" ? "🚨Hire🚨" : Type}
          </Text>
          <Text numberOfLines={1} style={styles.previousmessage}>
            {message}
          </Text>
        </View>
        {/* <View style={styles.leftViewCenter}>
          <View style={styles.leftView}>
            <TouchableOpacity onPress={() => setthreevisible(!threedotvisible)}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color="black"
                style={styles.tripledot}
              />
            </TouchableOpacity>
            <Time time="12:00" />
          </View>
        </View> */}
      </TouchableOpacity>
      {/* )} */}

      {/* {UnreadSeenUsers?.includes(currentuser?.uid) && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: 1,
            padding: 20,
            backgroundColor: UnreadSeenUsers?.includes(currentuser?.uid)
              ? Colors.tertiary
              : null,
            opacity: UnreadSeenUsers?.includes(currentuser?.uid) ? null : 0.5,
          }}
          onPress={() => HandleclickAnnounce()}
        >
          <TouchableOpacity style={styles.imagecontainer}>
            <Image source={{ uri: icon ? icon : null }} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={{ maxWidth: 200 }}>
              <View style={styles.row}>
                <NameText name={name} />
                <Text style={styles.previousmessage}>
                  {name} Announced something new
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.leftViewCenter}>
            <View style={styles.leftView}>
              <TouchableOpacity
                onPress={() => setthreevisible(!threedotvisible)}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  color="black"
                  style={styles.tripledot}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )} */}
    </SafeAreaView>
  );
};

export default NotifyItem;
