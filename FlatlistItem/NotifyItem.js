import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

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
import { DeleteUnreadUser } from "../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { RemoveUnseenUsers } from "../BACKEND/Announce";

const NotifyItem = ({
  name,
  icon,
  previousmessage,
  UnreadUsers,
  id,
  participants,
  UnreadSeenUsers,
  Seen,
  Type,
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const currentuser = useauth();
  const notify =
    Type == "OneToOne" ? !Seen : UnreadUsers?.includes(currentuser?.uid);

  function Handleclick() {
    const onechat = Type == "OneToOne";
    DeleteUnreadUser(id, currentuser?.uid, Type);

    navigation.navigate("Chat", {
      name,
      icon,
      id,
      participants,
      onechat,
    });
  }
  function HandleclickAnnounce() {
    RemoveUnseenUsers(currentuser?.uid, id);
    navigation.navigate("Portfolio", {
      useruid: id,
    });
  }
  return (
    <View>
      {notify && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: 1,
            padding: 20,
            backgroundColor: notify ? Colors.tertiary : null,
            opacity: notify ? null : 0.5,
          }}
          onPress={() => Handleclick()}
        >
          <TouchableOpacity style={styles.imagecontainer}>
            <Image source={{ uri: icon ? icon : null }} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={{ maxWidth: 200 }}>
              <View style={styles.row}>
                <NameText name={name} />
                {/* <View style={styles.end}>
                {checked && <Image style={styles.logo} source={CheckCircle} />}
              </View> */}
              </View>
              <Text numberOfLines={1} style={styles.previousmessage}>
                {previousmessage}
              </Text>
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
              {/* <Time time={time} /> */}
            </View>
          </View>
        </TouchableOpacity>
      )}

      {UnreadSeenUsers?.includes(currentuser?.uid) && (
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
      )}
    </View>
  );
};

export default NotifyItem;
