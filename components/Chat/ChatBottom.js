//Image Icon in React Native TextInput
//https://aboutreact.com/image-icon-with-react-native-textinput/

//import React in our code
import React, { useEffect, useState } from "react";

//import all the components we are going to use
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
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

export function ChatBottom({
  roomid,
  participants,
  name,
  icon,
  onechat,
  Type,
  Mess,
  Forwarded,
  Invite,
  InvitationData,
  Sponsor,
}) {
  const currentUser = useauth();

  const otheruserdata = SpecifiedUserData(roomid);
  const [height, setheight] = useState(23);
  const [text, settext] = useState();

  const [Photo, setPhoto] = useState();
  const [PhotoDetails, setPhotoDetails] = useState();
  const [loading, setloading] = useState();

  useEffect(() => {
    if (Invite) {
      settext(
        `You have been Invited by your dear friend to this group.I request you to join`,
        name
      );
    } else if (Sponsor) {
      settext(`I am is willing to sponsor you.what do you say?`);
    }
  }, [Invite, Sponsor]);
  useEffect(() => {
    if (Mess) {
      settext(Mess);
    }
  }, [Mess]);

  async function onSubmit() {
    const forwarded = Forwarded ? true : false;
    if (text != undefined) {
      if (!onechat) {
        await PostPrivateChats(
          roomid,
          currentUser?.uid,
          text,
          participants,
          name,
          icon,
          Forwarded,
          Invite,
          InvitationData,
          Photo,
          PhotoDetails
        );
        AddUnreadUser(roomid, participants);
      } else {
        await PostOnetoOnechat(
          roomid,
          currentUser?.uid,
          text,
          currentUser?.displayName,
          currentUser?.photoURL,
          forwarded,
          Invite,
          InvitationData,
          Photo,
          PhotoDetails,
          Sponsor,
          otheruserdata
        );
      }

      setheight(23);
      settext("");
    } else {
      showtoast("put some text");
    }
  }

  // <Text>{senttext}</Text>
  return (
    <View style={styles.container}>
      <View style={[styles.sectionStyle, { height: Math.max(35, height) }]}>
        {/* <TextInput
          style={[styles.textInputStyle, { height: Math.max(35, height) }]}
          placeholder="Type Thoughts"
          underlineColorAndroid="transparent"
          multiline
          onContentSizeChange={(event) => {
            setheight(event.nativeEvent.contentSize.height);
          }}
          onChangeText={settext}
          autoComplete
          textAlign="left"
          // onSubmitEditing={(e) => onSubmit(e)}
          value={text}
          clearButtonMode="always"
        /> */}
        <Customtextinput
          settext={settext}
          text={text}
          height={height}
          setheight={setheight}
          setPhoto={setPhoto}
          setPhotoDetails={setPhotoDetails}
        />
      </View>

      {/* <TouchableOpacity
        onPress={onSubmit}
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
      </TouchableOpacity> */}
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
