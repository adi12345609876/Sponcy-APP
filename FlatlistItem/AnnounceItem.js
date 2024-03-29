import React, { useState } from "react";

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
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const FormattedLikes = numFormatter(likes);
  const currentuser = useauth();
  const AllUsers = Usersforchat();

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
    Likemessage(currentuser?.uid, id);
  }
  async function Dislikeit(id) {
    Dislikemessage(currentuser?.uid, id);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {AllUsers?.map((item) => {
          <View>
            <Text>{item.Username}</Text>
          </View>;
        })}

        <Image
          source={{ uri: icon ? icon : null }}
          style={styles.profileicon}
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
        {LikedUsers?.includes(currentuser?.uid) ? (
          <>
            <TouchableOpacity onPress={() => Dislikeit(id)}>
              <AntDesign name="heart" size={15} color="red" />
              <Text>{FormattedLikes}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => Likeit(id)}>
              <AntDesign name="hearto" size={15} color="red" />
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
    </SafeAreaView>
  );
};

export default AnnounceItem;
