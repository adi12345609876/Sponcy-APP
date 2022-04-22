import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import button from "../../../../assets/Icon/EmailSend.png";
import { Colors } from "../../../../Features/Colors";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../../../Features/Styles";

import { UserData, PostAnnounce, AddRooms } from "../../../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../../../BACKEND/Auth";
import { PickImage } from "../../../../Features/Utils";
import { SuperButton } from "../../../../components/SuperComp/SuperComp";

export default function App({ route }) {
  const navigation = useNavigation();
  const currentuser = useauth();
  const [text, settext] = useState();
  const [Photo, setPhoto] = useState();
  const [PhotoURL, setPhotoURL] = useState();
  const [loading, setloading] = useState();

  async function handleClick() {
    await AddRooms(Photo, text, [currentuser?.uid], currentuser?.uid);
    navigation.navigate("MyDrawer", {
      screen: "Tabs",
    });
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
              text={"Create"}
              onPress={() => handleClick()}
              loading={loading}
              textstyle={styles.createbuttontext}
              buttonstyle={styles.submitbutton}
            />
            {/* <TouchableOpacity style={styles.submitbutton} onPress={handleClick}>
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
                Create
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={{ margin: 15, borderRadius: 10, marginTop: 40 }}>
          <TextInput
            placeholder="Room Name"
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
            source={{ uri: PhotoURL }}
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
      </>
    </View>
  );
}
