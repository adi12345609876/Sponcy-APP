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
import { SuperButton } from "../../../../components/SuperComp/SuperComp";
const Tab = createMaterialTopTabNavigator();

export default function App({ navigation }) {
  const currentuser = useauth();
  const currentUserData = UserData();
  const [Photo, setPhoto] = useState();
  const [DisplayName, setDisplayName] = useState();
  const [Bio, setBio] = useState();
  const [loading, setloading] = useState();
  // const currentUserData = UserData();
  const [PhotoURL, setPhotoURL] = useState();
  const [done, setdone] = useState(true);

  async function handleClick() {
    setloading(true);
    await updateUser(
      DisplayName ? DisplayName : currentuser?.displayName,
      Photo ? Photo : currentuser?.photoURL,
      Bio ? Bio : currentUserData?.Bio,
      currentuser
    );
    setloading(false);

    navigation.navigate("MyDrawer");
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
              uri: PhotoURL ? PhotoURL : currentuser?.PhotoURL,
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
              value={DisplayName ? DisplayName : currentuser?.displayName}
            />
          </View>
          <TextInput
            style={{
              marginLeft: 10,
              fontFamily: "Roboto",
              fontSize: 25,
              fontWeight: "bold",
            }}
            placeholder="Your Bio..."
            onChangeText={setBio}
            value={Bio ? Bio : currentUserData?.Bio}
          />
        </View>
      </View>
      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <SuperButton
          text={"Done"}
          onPress={() => handleClick()}
          loading={loading}
        />
      </View>
    </View>
  );
}
