import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import button from "../../assets/Icon/EmailSend.png";
import { Colors } from "../../Features/Colors";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../Features/Styles";

import { UserData, PostAnnounce, AddUnreadUser } from "../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../BACKEND/Auth";
import {
  AddUnseenUsers,
  getUserDetailsCollection,
} from "../../BACKEND/Announce";
export default function App() {
  const navigation = useNavigation();
  const currentuser = useauth();
  const currentUserData = UserData();
  const userdetails = getUserDetailsCollection(currentuser?.uid);

  const [text, settext] = useState();
  const [Photo, setPhoto] = useState();
  const [Followers, setFollowers] = useState();

  const [PhotoURL, setPhotoURL] = useState();
  const [done, setdone] = useState(false);
  useEffect(() => {
    if (userdetails) {
      userdetails
        ?.then((doc) => {
          setFollowers(doc.Followers);
        })
        .catch((e) => console.log("ERER", e));
    }
  }, [userdetails]);

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
    await PostAnnounce(
      Photo,
      text,
      currentuser?.uid,
      currentUserData?.array?.UserName,
      currentUserData?.array?.PhotoURL,
      setdone
    );
    AddUnseenUsers(currentuser?.uid, Followers);

    navigation.navigate("Tabs", {
      initialRoute: "Announce",
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
          onPress={() => navigation.navigate("CreateRooms")}
        >
          <Text style={{ color: Colors.white }}> create New Room?</Text>
        </TouchableOpacity>
      </>
    </View>
  );
}
