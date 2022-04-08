import React, { useState } from "react";
import { AdMobBanner } from "expo-ads-admob";

import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import ThreeDots from "../components/SuperComp/3dotComp";
//components
import { styles } from "../Features/Styles";

import NameText from "../components/SuperComp/Name";
import Time from "../components/SuperComp/time";
//assets
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../BACKEND/firebase";
import { Dislikemessage, Likemessage } from "../BACKEND/Announce";
import { useauth } from "../BACKEND/Auth";
//features
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../Hooks/GlobalHooks";
import { useLoading } from "../Hooks/LoadingContext";

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
  IsAds,
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const FormattedLikes = numFormatter(likes);
  const currentuser = useauth();
  const { setshowLoading } = useLoading();

  async function DeleteMessage(id) {
    setshowLoading(true);
    const doclocation = doc(
      db,
      "Announce",
      "LltxTedBAbKMuN07tX6j",
      "Message",
      id
    );
    await deleteDoc(doclocation);
    setshowLoading(false);
  }
  async function Editmessage(id) {
    navigation.navigate("Editmessage", {
      id,
      message,
      photo,
    });
  }
  async function Likeit(id) {
    Likemessage(currentuser?.uid, id);
  }
  async function Dislikeit(id) {
    Dislikemessage(currentuser?.uid, id);
  }
  return (
    <View>
      <View style={styles.container}>
        {IsAds && (
          <View>
            <AdMobBanner
              bannerSize="banner"
              adUnitID="ca-app-pub-2241821858793323/8713857097"
            />
          </View>
        )}

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigation.navigate("Portfolio", {
              useruid: user,
            })
          }
        >
          <View>
            <Image source={{ uri: icon }} style={styles.profileicon} />
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
          <Image source={{ uri: photo }} style={styles.photo} />
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

        {/* <TouchableOpacity>
          <AntDesign name="retweet" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="share" size={15} color="black" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default AnnounceItem;
