import React, { useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
//components
import { styles } from "../Features/Styles";

import NameText from "../components/SuperComp/Name";
import Time from "../components/SuperComp/time";
//assets
import { deleteDoc, doc } from "firebase/firestore";
import { db, Usersforchat } from "../BACKEND/firebase";
import { Dislikemessage, Likemessage } from "../BACKEND/Announce";
import { useauth } from "../BACKEND/Auth";
//features
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../Hooks/GlobalHooks";
import { Avatar } from "react-native-paper";
import { Colors } from "../Features/Colors";

const SearchItem = ({
  icon,
  message,
  photo,
  name,
  likes,
  time,
  id,
  user,
  LikedUsers,
  Searchtext,
}) => {
  const navigation = useNavigation();
  const [threedotvisible, setthreevisible] = useState(false);
  const FormattedLikes = numFormatter(likes);
  const currentuser = useauth();
  const AllUsers = Usersforchat();
  // const { setshowLoading } = useLoading();
  // console.log("ICON", icon);

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
  async function Likeit(id) {
    Likemessage(currentuser?.uid, id);
  }
  async function Dislikeit(id) {
    Dislikemessage(currentuser?.uid, id);
  }
  const renderItem = ({ item }) => {
    const SearchFilter = item?.UserName?.toLowerCase()?.includes(
      Searchtext?.toLowerCase()
    );

    return <>{SearchFilter ? <></> : null}</>;
  };
  return (
    <SafeAreaView>
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
        <View style={styles.container}>
          {Searchtext && (
            <>
              {AllUsers?.map((item) => {
                <View>
                  <Text>{item.Username}</Text>
                </View>;
              })}
            </>
          )}

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("Portfolio", {
                useruid: user,
              })
            }
          >
            <Avatar.Image
              size={50}
              source={{ uri: icon ? icon : null }}
              style={{ backgroundColor: Colors.grey }}
            />

            <View style={styles.namecontainer}>
              <NameText name={name} />
            </View>
          </TouchableOpacity>

          <View style={styles.timecontainer}>
            <Time time={time} />
          </View>
        </View>
        <View style={styles.messagecontainer}>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
        {photo && (
          <TouchableOpacity style={styles.photocontainer}>
            <Image
              source={{ uri: photo ? photo : null }}
              style={styles.photo}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {/* <View style={styles.iconcontainer}>
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
        </TouchableOpacity> 
      </View> */}
    </SafeAreaView>
  );
};

export default SearchItem;
