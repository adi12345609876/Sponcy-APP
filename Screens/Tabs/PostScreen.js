import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import button from "../../assets/Icon/EmailSend.png";
import { Colors } from "../../Features/Colors";
import { styles } from "../../Features/Styles";

import { PostAnnounce } from "../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../BACKEND/Auth";
import { PickImage, showtoast } from "../../Features/Utils";
import { SuperButton } from "../../components/SuperComp/SuperComp";
export default function App() {
  const navigation = useNavigation();
  const currentuser = useauth();
  const [text, settext] = useState();
  const [Photo, setPhoto] = useState();
  const [loading, setloading] = useState();
  const [PhotoURL, setPhotoURL] = useState();

  async function handleClick() {
    if (text != undefined) {
      if (currentuser) {
        setloading(true);
        await PostAnnounce(
          Photo,
          text,
          currentuser?.uid,
          currentuser?.displayName,
          currentuser?.photoURL
        );
        setloading(false);
        navigation.navigate("MyDrawer");
      } else {
      }
    } else {
      setloading(false);
      showtoast("Enter some text");
    }
  }
  return (
    <View style={styles.Postcontainer}>
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={{ position: "absolute", right: 10 }}>
            <SuperButton
              text={"Announce"}
              onPress={() => handleClick()}
              loading={loading}
              image={button}
              textstyle={{
                marginRight: 14,
                marginBottom: 10,
                fontWeight: "bold",
                color: "Colors.white",
              }}
              buttonstyle={styles.submitbutton}
            />
          </View>
        </View>
        <View style={{ margin: 15, borderRadius: 10, marginTop: 40 }}>
          <TextInput
            placeholder="Type your thoughts"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={settext}
            textAlign="left"
            value={text}
            multiline
            maxLength={250}
          />
        </View>
        <TouchableOpacity
          style={{
            margin: 20,
            justifyContent: "center",

            alignItems: "center",
          }}
          onPress={() => PickImage(setPhoto, setPhotoURL)}
        >
          <ImageBackground
            source={{ uri: PhotoURL ? PhotoURL : null }}
            resizeMode="cover"
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              backgroundColor: Colors.grey,

              justifyContent: "center",

              alignItems: "center",
            }}
          >
            <Ionicons name="pencil" size={24} color="black" />
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
          }}
          onPress={() => navigation.navigate("CreateRooms")}
        >
          <Text style={{ color: Colors.white }}> create New Room?</Text>
        </TouchableOpacity>
      </>
    </View>
  );
}
