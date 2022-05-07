import React, { useEffect, useRef, useState } from "react";

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//components
import { styles } from "../Features/Styles";

import Time from "../components/SuperComp/time";
//assets
import { deleteDoc, doc } from "firebase/firestore";
import { db, Usersforchat } from "../BACKEND/firebase";
import { Dislikemessage, Likemessage } from "../BACKEND/Announce";
import { useauth } from "../BACKEND/Auth";
//features
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../Hooks/GlobalHooks";
import { Colors } from "../Features/Colors";
import { Avatar } from "react-native-paper";
import LottieView from "lottie-react-native";
import { SuperIcons } from "../components/SuperComp/SuperComp";
const AnnounceItem = ({
  icon,
  message,
  photo,
  name,
  likes,
  time,
  id,
  user,
  LikedUsers,
  Like,
  onLike,
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);

  const [loading, setloading] = useState(false);
  const likeanimation = useRef(null);
  const FormattedLikes = numFormatter(likes);
  const currentuser = useauth();
  const AllUsers = Usersforchat();
  let deviceWidth = Dimensions.get("screen").width;
  const isLiked = Like || LikedUsers?.includes(currentuser?.uid);
  const isLikedFirstrun = useRef(true);

  useEffect(() => {
    if (onLike != undefined) {
      if (isLikedFirstrun.current) {
        //normal state
        if (isLiked) {
          likeanimation.current.play(60, 60);
        } else {
          likeanimation.current.play(10, 10);
        }
        isLikedFirstrun.current = false;
      }
      //animation transition
      else if (isLiked) {
        likeanimation.current.play(20, 60);
      } else {
        likeanimation.current.play(0, 20);
      }
    }
  }, [isLiked]);
  useEffect(() => {
    if (Like) {
      Likemessage(currentuser?.uid, id);
    } else if (Like != true) {
      Dislikemessage(currentuser?.uid, id);
    }
  }, [Like]);
  let lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      onLike(id);
    } else {
      lastTap = now;
    }
  };
  async function DeleteMessage(id) {
    const doclocation = doc(
      db,
      "Announce",

      id
    );
    await deleteDoc(doclocation);

    setthreevisible(false);
  }
  async function Editmessage(id) {
    navigation.navigate("Editmessage", {
      id,
      message,
      photo,
    });
    setthreevisible(false);
  }

  return (
    <TouchableOpacity
      onLongPress={() => onLike(id)}
      onPress={() =>
        navigation.navigate("Comments", {
          message,
          photo,
          name,
          icon,
          time,
          id,
          user,
        })
      }
    >
      <SafeAreaView style={{ width: deviceWidth }}>
        <View style={styles.container}>
          <Avatar.Image
            size={50}
            source={{ uri: icon ? icon : null }}
            style={{ backgroundColor: Colors.grey }}
          />

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("Portfolio", {
                useruid: user,
              })
            }
          >
            <View style={styles.namecontainer}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: Colors.black,
                  textAlign: "center",
                  marginLeft: 10,
                }}
              >
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.messagecontainer}>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>

        <View style={styles.timecontainer}>
          <Time time={time} />
        </View>
        {photo && (
          <TouchableOpacity
            style={styles.photocontainer}
            onPress={() =>
              navigation.navigate("SuperContainerImage", {
                photo,
              })
            }
          >
            <Image
              source={{ uri: photo ? photo : null }}
              style={[styles.photo]}
            />
          </TouchableOpacity>
        )}
        {onLike != undefined && (
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
                  user,
                })
              }
            >
              {/* <Ionicons
                name="chatbubble-ellipses-outline"
                size={20}
                color="black"
              /> */}
              <SuperIcons name={"Comment"} size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onLike(id)}
              disabled={loading}
              style={{ paddingRight: 25 }}
            >
              <LottieView
                ref={likeanimation}
                style={styles.Lottieheart}
                source={require("../assets/Lottie/Heart.json")}
                autoPlay={false}
                loop={false}
                autoSize={true}
              />
              <Text
                style={{ fontSize: 13, color: Like ? "#ff3e3e" : Colors.grey }}
              >
                {FormattedLikes}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity>
          <AntDesign name="retweet" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="share" size={15} color="black" />
        </TouchableOpacity> */}
          </View>
        )}
      </SafeAreaView>
    </TouchableOpacity>
  );
};

export default AnnounceItem;
{
  /* {user == currentuser?.uid && (
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
        )} */
}
