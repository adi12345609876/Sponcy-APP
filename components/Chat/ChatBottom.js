//Image Icon in React Native TextInput
//https://aboutreact.com/image-icon-with-react-native-textinput/

//import React in our code
import React, { useEffect, useState } from "react";

//import all the components we are going to use
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../Features/Features";
import {
  AddUnreadUser,
  PostOnetoOnechat,
  PostPrivateChats,
  SpecifiedUserData,
  UserData,
} from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import Customtextinput from "../../components/SuperComp/Textinput";

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

  const userdata = SpecifiedUserData(currentUser?.uid);
  const otheruserdata = SpecifiedUserData(roomid);
  const [height, setheight] = useState(23);
  const [text, settext] = useState();

  const [Photo, setPhoto] = useState();
  const [PhotoDetails, setPhotoDetails] = useState();

  console.log("Message", text, Mess, InvitationData, Invite);

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
    if (text == "") {
      console.warn("Empty Text Is not Valid,Please Type any text");
    } else {
      console.log("roomid:", roomid, "user:", currentUser?.uid, "TEXT:", text);
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
          userdata?.UserName,
          userdata?.PhotoURL,
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
        {/* <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Entypo name="circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View> */}
      </View>

      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    maxHeight: 100,
    width: "60%",
    borderRadius: 10,
    // alignSelf: 'center',
    // justifyContent: 'center',
    fontSize: 15,
    fontWeight: "450",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  sectionStyle: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    margin: 10,
    maxHeight: 100,
    alignSelf: "flex-start",
  },
});
