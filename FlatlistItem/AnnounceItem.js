import React, { useEffect, useRef, useState } from "react";

import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import ThreeDots from "../components/SuperComp/3dotComp";
//components
import { styles } from "../Features/Styles";

import NameText from "../components/SuperComp/Name";
import Time from "../components/SuperComp/time";
//assets
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db, Usersforchat } from "../BACKEND/firebase";
import { Dislikemessage, Likemessage } from "../BACKEND/Announce";
import { useauth } from "../BACKEND/Auth";
//features
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../Hooks/GlobalHooks";
import { useLoading } from "../Hooks/LoadingContext";
import { Colors } from "../Features/Colors";
import { Avatar } from "react-native-paper";
import LottieView from "lottie-react-native";
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
  selected,
  onSelect,
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);

  const [loading, setloading] = useState(false);
  const likeanimation = useRef(null);
  const FormattedLikes = numFormatter(likes);
  const currentuser = useauth();
  const AllUsers = Usersforchat();
  let deviceWidth = Dimensions.get("screen").width;
  const isLiked = selected;
  const isLikedFirstrun = useRef(true);

  useEffect(() => {
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
  }, [isLiked]);
  useEffect(() => {
    if (selected) {
      Likemessage(currentuser?.uid, id);
    } else {
      Dislikemessage(currentuser?.uid, id);
    }
  }, [selected]);

  async function DeleteMessage(id) {
    const doclocation = doc(
      db,
      "Announce",
      "LltxTedBAbKMuN07tX6j",
      "Message",
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

  async function Likeit(id) {
    setloading(true);
    await Likemessage(currentuser?.uid, id);
    setloading(false);
  }
  async function Dislikeit(id) {
    setloading(true);
    await Dislikemessage(currentuser?.uid, id);
    setloading(false);
  }

  return (
    <SafeAreaView style={{ width: deviceWidth }}>
      <View style={styles.container}>
        <Avatar.Image
          size={50}
          source={{ uri: icon ? icon : null }}
          style={{ backgroundColor: "grey" }}
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
                fontSize: 15,
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
        <TouchableOpacity style={styles.photocontainer}>
          <Image source={{ uri: photo ? photo : null }} style={styles.photo} />
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
              user,
            })
          }
        >
          <MaterialCommunityIcons
            name="message-reply-text"
            size={15}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSelect(id)} disabled={loading}>
          <LottieView
            ref={likeanimation}
            style={styles.Lottieheart}
            source={require("../assets/Lottie/Heart.json")}
            autoPlay={false}
            loop={false}
            autoSize={true}
          />
          <Text>{FormattedLikes}</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <AntDesign name="retweet" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="share" size={15} color="black" />
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
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
