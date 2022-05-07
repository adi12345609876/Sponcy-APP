//Image Icon in React Native TextInput
//https://aboutreact.com/image-icon-with-react-native-textinput/

//import React in our code
import React, { useEffect, useState } from "react";

//import all the components we are going to use
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";
import {
  AddUnreadUser,
  PostOnetoOnechat,
  PostPrivateChats,
  SpecifiedUserData,
  UserData,
} from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import Customtextinput from "../../components/SuperComp/Textinput";
import { styles } from "../../Features/Styles";
import { SuperButton } from "../SuperComp/SuperComp";
import { showtoast } from "../../Features/Utils";

export function ChatBottom({ roomid, participants }) {
  const currentUser = useauth();

  const otheruserdata = SpecifiedUserData(roomid);
  const [height, setheight] = useState(23);
  const [text, settext] = useState();

  const [Photo, setPhoto] = useState();
  const [PhotoURL, setPhotoURL] = useState();
  const [PhotoDetails, setPhotoDetails] = useState();
  const [loading, setloading] = useState();

  async function onSubmit() {
    if (text != undefined) {
      await PostPrivateChats(
        roomid,
        currentUser?.uid,
        text,
        participants,
        Photo
      );
      AddUnreadUser(roomid, participants);
      setheight(23);
      settext("");
    } else {
      showtoast("put some text");
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.sectionStyle, { height: Math.max(35, height) }]}>
        <Customtextinput
          settext={settext}
          text={text}
          height={height}
          setheight={setheight}
          setPhoto={setPhoto}
          PhotoURL={PhotoURL}
          setPhotoURL={setPhotoURL}
          setPhotoDetails={setPhotoDetails}
        />
      </View>

      <SuperButton
        onPress={() => onSubmit()}
        loading={loading}
        buttonstyle={{
          backgroundColor: Colors.primary,
          borderRadius: 20,
          bottom: 10,
          position: "absolute",
          right: 10,
          padding: 10,
        }}
      >
        <FontAwesome name="send-o" size={20} color="white" />
      </SuperButton>
    </View>
  );
}
