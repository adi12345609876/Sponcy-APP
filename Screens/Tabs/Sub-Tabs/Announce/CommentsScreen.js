import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
//components
import Nullprofile from "../../../../Hooks/NullProfile";
import NameText from "../../../../components/SuperComp/Name";
import Time from "../../../../components/SuperComp/time";
import Customtextinput from "../../../../components/SuperComp/Textinput";
//assets
import DummyNetflixIcon from "../../../../assets/Photos/Dummyicon/Netflix.png";
import DummyTeslaIcon from "../../../../assets/Photos/Dummyicon/Tesla.png";
import CommentItem from "../../../../FlatlistItem/CommentItem";
//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
import { Colors } from "../../../../Features/Features";
import {
  getComments,
  PostComments,
  UserData,
} from "../../../../BACKEND/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { useauth } from "../../../../BACKEND/Auth";
import { TimestamptoTime } from "../../../../Hooks/GlobalHooks";
// import { ParticularUser } from "../../../../Hooks/GlobalHooks";

const HomeItem = ({ navigation, route }) => {
  const { message, photo, name, icon, checked, time, id } = route.params;
  const Comments = getComments(id);
  const currentuser = useauth();
  const currentUserData = UserData();
  const [text, settext] = useState();
  const [height, setheight] = useState(23);
  const [senttext, setsenttext] = useState("");
  const [Photo, setPhoto] = useState();
  const [PhotoURL, setPhotoURL] = useState();
  console.log(Comments);
  useEffect(() => {
    setsenttext(text);
    console.log(senttext);
  }, [text]);
  async function Submit() {
    console.log(
      id,
      Photo ? Photo : "",
      senttext ? senttext : "",
      currentuser?.uid,
      currentUserData?.array?.UserName,
      currentUserData?.array?.PhotoURL
    );
    await PostComments(
      id,
      Photo ? Photo : null,
      senttext ? senttext : null,
      currentuser?.uid,
      currentUserData?.array?.UserName,
      currentUserData?.array?.PhotoURL
    );
    settext("");
    setheight(23);
    console.log("Submitted");
  }
  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);
    console.log("TIME:", Time);
    return (
      <CommentItem
        message={item.message}
        photo={item.PhotoURL}
        name={item.UserName}
        icon={item.UserPhoto}
        // checked={item.checked}
        time={Time.time}
        id={item.id}
      />
    );
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.originalmessage}>
          <View style={styles.topcontainer}>
            <TouchableOpacity>
              <Image
                source={icon ? icon : Nullprofile({ name })}
                style={styles.profileicon}
              />
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
              <Image source={photo} style={styles.photo} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.comments}>
          <View style={{}}>
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
          <View style={{ alignItems: "flex-start" }}>
            <View
              style={{
                marginLeft: 20,
              }}
            >
              <FlatList
                data={Comments}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomcontainer}>
        <Customtextinput
          settext={settext}
          text={text}
          height={height}
          setheight={setheight}
          setPhoto={setPhoto}
          setPhotoURL={setPhotoURL}
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

const styles = StyleSheet.create({
  topcontainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  bottomcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: deviceWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
  },
  comments: {},
  originalmessage: {},
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
export default HomeItem;
