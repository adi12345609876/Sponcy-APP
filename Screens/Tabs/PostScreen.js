import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import button from "../../assets/Icon/EmailSend.png";
import { Colors } from "../../Features/Features";
import * as ImagePicker from "expo-image-picker";

import { UserData, PostAnnounce } from "../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../BACKEND/Auth";
export default function App() {
  const navigation = useNavigation();
  const currentuser = useauth();

  const [text, settext] = useState();
  const [Photo, setPhoto] = useState();

  const [PhotoURL, setPhotoURL] = useState();
  const [done, setdone] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      //changing the file from long data to short readable https
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      //then set it as the image

      setPhoto(bytes);
      setPhotoURL(result.uri);
    }
  };
  async function handleClick() {
    console.log([Photo, text, currentuser.uid, setdone]);
    await PostAnnounce(Photo, text, currentuser.uid, setdone);
    console.log("Updated");
    navigation.navigate("Tabs");
  }
  return (
    <View style={styles.container}>
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
            <TouchableOpacity style={styles.submitbutton} onPress={handleClick}>
              <Image
                source={button}
                style={{ height: 35, width: 35, marginRight: 5 }}
              />

              <Text
                style={{
                  marginRight: 14,
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: "Colors.white",
                }}
              >
                Announce
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ margin: 15, borderRadius: 10, marginTop: 40 }}>
          <TextInput
            placeholder="Type your thoughts"
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={settext}
            autoComplete
            textAlign="left"
            value={text}
            multiline
            maxLength={250}
          />
        </View>
        <TouchableOpacity style={{ margin: 20 }} onPress={pickImage}>
          <View
            style={{
              width: 300,
              height: 200,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="camera-plus"
              size={50}
              color="Colors.whitedfa"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
          }}
          onPress={() => navigation.navigate("Participants")}
        >
          <Text style={{ color: Colors.white }}> create New Room?</Text>
        </TouchableOpacity>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 15,
  },
  submitbutton: {
    backgroundColor: Colors.primary,
    width: 140,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  input: {
    maxHeight: 200,
    height: 200,
    textAlignVertical: "top",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
});
