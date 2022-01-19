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
import { useauth, upload } from "../BACKEND/firebase";
import Dummyimage from "../assets/Photos/Dummyphotos/netfliximage.png";
import * as ImagePicker from "expo-image-picker";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-paper";
import { NullImage } from "../Features/GlobalConst";

const Tab = createMaterialTopTabNavigator();

export default function App({ navigation }) {
  
  const currentuser = useauth();
  const [Photo, setPhoto] = useState();
  const [PhotoURL, setPhotoURL] = useState("https://firebasestorage.googleapis.com/v0/b/sponcy-7003f.appspot.com/o/Person.png?alt=media&token=79018f26-8263-4230-8713-97c68a845570.png");
  
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
      const img = await fetch(result.uri)
      const bytes = await img.blob();
      //then set it as the image
      // "data:image/png;base64," + bytes;
      setPhoto(bytes);
      setPhotoURL(result.uri);
      // setusablephoto(result.uri);
      
    }
  };
  function handleClick() {
    upload(Photo, currentuser);
  }

  useEffect(() => {
    if (currentuser?.photoURL) {
      setPhotoURL(currentuser?.photoURL);
    }
   
    console.log("PHOTO:",PhotoURL)
  },[currentuser])
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor="#000"
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
            source={{uri: PhotoURL }}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
            }}
          >
            <BlurView
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                height: 100,
                width: 100,
              }}
              intensity={10}
            >
              <Ionicons name="pencil" size={24} color="black" />
            </BlurView>
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
            />
          </View>
          <TextInput
            style={{
              marginLeft: 10,
              fontFamily: "Roboto",
              fontSize: 15,
              fontWeight: "normal",
              color: "#3b3b3b",
            }}
            placeholder="Slogan"
          />
        </View>
      </View>
      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            height: 50,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={handleClick}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
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
