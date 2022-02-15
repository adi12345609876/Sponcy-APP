import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-paper";
import { updateUser } from "../../BACKEND/firebase";
import { Colors } from "../../Features/Features";
import { useauth } from "../../BACKEND/Auth";
// import nullphoto from "../../assets/Photos/Dummyphotos/null.png";
const Tab = createMaterialTopTabNavigator();

export default function App({ navigation }) {
  const currentuser = useauth();
  const [Photo, setPhoto] = useState();
  const [DisplayName, setDisplayName] = useState();
  const [Slogan, setSlogan] = useState("");

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
      console.log(PhotoURL);
    }
  };
  async function handleClick() {
    // upload(Photo, DisplayName, currentuser, setdone);UserName, Photo, Slogan, currentUser,setdone
    await updateUser(DisplayName, Photo, Slogan, currentuser, setdone);
    console.log("Updated");
    navigation.navigate("Tabs");
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: Colors.white,
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={Colors.black}
        barStyle={"light-content"}
      />
      <View
        style={{
          flex: 0.4,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <ImageBackground
            source={{ uri: PhotoURL }}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              backgroundColor: Colors.grey,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <BlurView
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                height: 100,
                width: 100,
              }}
              intensity={10}
            > */}
            <Ionicons name="pencil" size={24} color="black" />
            {/* </BlurView> */}
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 5 }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: "Roboto",
                fontSize: 25,
                fontWeight: "bold",
              }}
              placeholder="Name"
              onChangeText={setDisplayName}
              value={DisplayName}
            />
          </View>
          <TextInput
            style={{
              marginLeft: 10,
              fontFamily: "Roboto",
              fontSize: 25,
              fontWeight: "bold",
            }}
            placeholder="Name"
            onChangeText={setSlogan}
            value={Slogan}
          />
        </View>
      </View>
      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: done || !DisplayName ? Colors.grey : "orange",
            height: 50,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={handleClick}
          disabled={done || !DisplayName}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, color: Colors.white }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
