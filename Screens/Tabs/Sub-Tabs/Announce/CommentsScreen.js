import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
//components
import NameText from "../../../../components/SuperComp/Name";
import Time from "../../../../components/SuperComp/time";
import Customtextinput from "../../../../components/SuperComp/Textinput";
//assets
import CommentItem from "../../../../FlatlistItem/CommentItem";
//features
import { Colors } from "../../../../Features/Colors";
import { getComments, PostComments } from "../../../../BACKEND/Announce";
import { FontAwesome } from "@expo/vector-icons";
import { useauth } from "../../../../BACKEND/Auth";
import { relativetime } from "../../../../Hooks/GlobalHooks";
// import { ParticularUser } from "../../../../Hooks/GlobalHooks";
import { styles } from "../../../../Features/Styles";
import { Avatar } from "react-native-paper";

const HomeItem = ({ route }) => {
  const { message, photo, name, icon, time, id } = route.params;
  const Comments = getComments(id);
  const currentuser = useauth();
  // const currentUserData = UserData();
  const [text, settext] = useState();
  const [height, setheight] = useState(23);
  const [senttext, setsenttext] = useState("");
  const [Photo, setPhoto] = useState();
  const [PhotoURL, setPhotoURL] = useState();

  useEffect(() => {
    setsenttext(text);
  }, [text]);
  async function Submit() {
    await PostComments(
      id,
      Photo ? Photo : null,
      senttext ? senttext : null,
      currentuser?.uid,
      currentuser?.displayName,
      currentuser?.photoURL
    );
    settext("");
    setheight(23);
  }
  const renderItem = ({ item }) => {
    const Time = relativetime(item?.time);

    return (
      <CommentItem
        message={item.message}
        photo={item.PhotoURL}
        name={item.UserName}
        icon={item.UserPhoto}
        // checked={item.checked}
        time={Time}
        id={item.id}
        user={item.user}
      />
    );
  };

  return (
    <>
      <View
        style={{ flex: 1, marginBottom: 100, backgroundColor: Colors.white }}
      >
        <View style={styles.comments}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.originalmessage}>
                <View style={styles.topcontainer}>
                  <TouchableOpacity>
                    <Avatar.Image
                      size={50}
                      source={{ uri: icon ? icon : null }}
                      style={{ backgroundColor: Colors.grey }}
                    />
                    {/* <Image source={{ uri: icon }} style={styles.profileicon} /> */}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.namecontainer}>
                    <NameText name={name} />
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
                    <Image source={{ uri: photo }} style={styles.photo} />
                  </TouchableOpacity>
                )}
                <Text
                  style={{
                    borderTopColor: Colors.grey,
                    borderBottomColor: Colors.grey,
                    borderWidth: 0.5,
                    textAlign: "center",
                    marginVertical: 10,
                    fontSize: 15,
                    fontWeight: "bold",
                    color: Colors.grey,
                  }}
                >
                  Comments
                </Text>
              </View>
            }
            data={Comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <SafeAreaView style={styles.bottomcontainer}>
        <Customtextinput
          settext={settext}
          text={text}
          height={height}
          setheight={setheight}
          setPhoto={setPhoto}
          setPhotoURL={setPhotoURL}
          PhotoURL={PhotoURL}
        >
          <TouchableOpacity
            onPress={() => Submit()}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 20,
              bottom: 10,
              position: "absolute",
              right: 10,
              padding: 10,
            }}
          >
            <FontAwesome name="send-o" size={20} color="white" />
          </TouchableOpacity>
        </Customtextinput>
      </SafeAreaView>
    </>
  );
};

export default HomeItem;
