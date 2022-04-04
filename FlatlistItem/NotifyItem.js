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
import Nullprofile from "../Hooks/NullProfile";
// import Time from "../components/SuperComp/time";

//assets

// import CheckCircle from "../assets/Photos/icons/CheckCircle.png";
//features
import { Colors } from "../Features/Features";
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
    // console.log("CHAT:", messages);
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
            <Image
              source={icon ? icon : Nullprofile({ name })}
              style={styles.image}
            />
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
            <Image
              source={icon ? icon : Nullprofile({ name })}
              style={styles.image}
            />
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

const styles = StyleSheet.create({
  end: { justifyContent: "flex-end" },
  row: { flexDirection: "row" },
  previousmessage: {
    fontFamily: "Red Hat Display",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    color: Colors.black,
  },
  imagecontainer: {
    justifyContent: "flex-end",
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    width: 45,
    height: 45,

    marginLeft: 20,
    marginHorizontal: 1,
    borderRadius: 200,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  tripledot: {
    color: Colors.grey,
    marginBottom: 10,
  },
  time: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: Colors.grey,
  },
  logo: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  leftView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  leftViewCenter: {
    flexDirection: "row",
    position: "absolute",
    right: 3,
    bottom: 5,
  },
});

export default NotifyItem;
// flexDirection: 'row',
//         position: 'absolute',
//         right: 3,
//         bottom: 5,
