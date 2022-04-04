import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import ThreeDots from "../components/SuperComp/3dotComp";
//components
import { Card } from "react-native-paper";

import Nullprofile from "../Hooks/NullProfile";
import NameText from "../components/SuperComp/Name";
import Time from "../components/SuperComp/time";
import { Colors } from "../Features/Features";
//assets
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, UserData } from "../BACKEND/firebase";
import { Dislikemessage, Likemessage } from "../BACKEND/Announce";
import { useauth } from "../BACKEND/Auth";
//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../Hooks/GlobalHooks";

const AnnounceItem = ({
  message,
  photo,
  name,
  icon,
  likes,
  time,
  id,
  user,
  LikedUsers,
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const FormattedLikes = numFormatter(likes);
  const currentuser = useauth();

  const currentUserData = UserData();

  async function DeleteMessage(id) {
    const doclocation = doc(
      db,
      "Announce",
      "LltxTedBAbKMuN07tX6j",
      "Message",
      id
    );
    await deleteDoc(doclocation);
  }
  async function Editmessage(id) {
    navigation.navigate("Editmessage", {
      id,
      message,
      photo,
    });
  }
  async function Likeit(id) {
    console.log("currentuser:", currentuser?.uid, "id:", id);

    Likemessage(currentuser?.uid, id);
  }
  async function Dislikeit(id) {
    console.log("currentuser:", currentuser?.uid, "id:", id);

    Dislikemessage(currentuser?.uid, id);
  }
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigation.navigate("Portfolio", {
              useruid: user,
            })
          }
        >
          <View>
            <Image
              source={icon ? icon : Nullprofile({ name })}
              style={styles.profileicon}
            />
          </View>
          <View style={styles.namecontainer}>
            <NameText name={name} />
          </View>
        </TouchableOpacity>

        <View style={styles.timecontainer}>
          <Time time={time} />
        </View>
        {user == currentuser?.uid && (
          <>
            <TouchableOpacity
              style={{ top: 10 }}
              onPress={() => setthreevisible(!threedotvisible)}
            >
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>
            <View style={{ top: 75, position: "absolute", right: 15 }}>
              <ThreeDots
                visibility={threedotvisible}
                height={100}
                width={200}
                data={[
                  {
                    text: "Edit",
                    icon: "pencil-outline",
                    func: () => Editmessage(id),
                  },
                  {
                    text: "Delete",
                    icon: "trash-outline",
                    func: () => DeleteMessage(id),
                  },
                ]}
              />
            </View>
          </>
        )}
      </View>
      <View style={styles.messagecontainer}>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
      {photo && (
        <TouchableOpacity style={styles.photocontainer}>
          <Image source={photo} style={styles.photo} />
        </TouchableOpacity>
      )}
      <View style={styles.iconcontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Comments", {
              message,
              photo,
              name,
              icon,

              time,
              id,
            })
          }
        >
          <MaterialCommunityIcons
            name="message-reply-text"
            size={15}
            color="black"
          />
        </TouchableOpacity>
        {LikedUsers?.includes(currentuser?.uid) ? (
          <>
            <TouchableOpacity onPress={() => Dislikeit(id)}>
              <AntDesign name="heart" size={15} color="black" />
              <Text>{FormattedLikes}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => Likeit(id)}>
              <AntDesign name="hearto" size={15} color="black" />
              <Text>{FormattedLikes}</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity>
          <AntDesign name="retweet" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="share" size={15} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 10 },
  profileicon: {
    width: 60,
    height: 60,
    borderRadius: 200,
    marginHorizontal: 5,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  photocontainer: {
    width: deviceWidth,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: 250,
    height: 200,
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 2,
    elevation: 2,
    marginLeft: 10,
  },
  messagecontainer: {
    maxWidth: deviceWidth - 100,
    marginLeft: 60,
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  message: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "650",
    fontStyle: "normal",
    color: Colors.black,
    letterSpacing: 1,
  },
  iconcontainer: {
    flexDirection: "row",
    width: 340,
    justifyContent: "space-evenly",
    marginVertical: 30,
  },
  namecontainer: {
    justifyContent: "flex-end",
    flexDirection: "row",

    marginTop: 10,
  },
  timecontainer: {
    width: deviceWidth / 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
export default AnnounceItem;
