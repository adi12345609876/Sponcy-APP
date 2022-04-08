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
import { styles } from "../../../../Features/Styles";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-paper";
import { UserData } from "../../../../BACKEND/firebase";
import { updateUser } from "../../../../BACKEND/Auth";
import { useauth } from "../../../../BACKEND/Auth";
import { Colors } from "../../../../Features/Colors";
import { PickImage } from "../../../../Features/Utils";
const Tab = createMaterialTopTabNavigator();

export default function App({ navigation }) {
  const currentuser = useauth();
  const currentUserData = UserData();
  const [Photo, setPhoto] = useState();
  const [DisplayName, setDisplayName] = useState();
  const [Slogan, setSlogan] = useState();

  const [PhotoURL, setPhotoURL] = useState();
  const [done, setdone] = useState(false);

  async function handleClick() {
    await updateUser(
      DisplayName ? DisplayName : currentUserData?.array?.UserName,
      Photo ? Photo : currentUserData?.array?.PhotoURL,
      Slogan ? Slogan : currentUserData?.array?.Slogan,
      currentuser?.uid,
      setdone
    );
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
        <TouchableOpacity onPress={() => PickImage(setPhoto, setPhotoURL)}>
          <ImageBackground
            source={{
              uri: PhotoURL ? PhotoURL : currentUserData?.array?.PhotoURL,
            }}
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
              onChangeText={setDisplayName}
              value={
                DisplayName ? DisplayName : currentUserData?.array?.UserName
              }
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
            value={Slogan ? Slogan : currentUserData?.array?.Slogan}
          />
        </View>
      </View>
      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: done || !Photo ? Colors.grey : "orange",
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
