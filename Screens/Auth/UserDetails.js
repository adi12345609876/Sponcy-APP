import React, { useState } from "react";
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
import { styles } from "../../Features/Styles";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TextInput } from "react-native-paper";
import { updateUser } from "../../BACKEND/Auth";
import { Colors } from "../../Features/Colors";
import { useauth } from "../../BACKEND/Auth";
import nullPhoto from "../../assets/Photos/null.png";
import { useNavigation } from "@react-navigation/native";
import { PickImage } from "../../Features/Utils";
import { SuperButton } from "../../components/SuperComp/SuperComp";

export default function App({ navigation }) {
  // const navigation = useNavigation();

  const currentuser = useauth();
  const [Photo, setPhoto] = useState();
  const [DisplayName, setDisplayName] = useState();
  const [Bio, setBio] = useState("");

  const [PhotoURL, setPhotoURL] = useState();
  const [loading, setloading] = useState(false);

  async function handleClick() {
    setloading(true);
    await updateUser(DisplayName, Photo ? Photo : nullPhoto, Bio, currentuser);
    setloading(false);
    navigation.navigate("MyDrawer", {
      initialRoute: "Tabs",
    });
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
            <Ionicons name="pencil" size={24} color="black" />
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
            placeholder="Bio"
            onChangeText={setBio}
            value={Bio}
          />
        </View>
      </View>
      <View style={{ position: "absolute", right: 20, bottom: 20 }}>
        <SuperButton
          text={"Done"}
          onPress={() => handleClick()}
          loading={loading}
          buttonstyle={{
            backgroundColor: !DisplayName ? Colors.grey : "orange",
            height: 50,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          textstyle={{ fontWeight: "bold", fontSize: 20, color: Colors.white }}
        />
      </View>
    </View>
  );
}
