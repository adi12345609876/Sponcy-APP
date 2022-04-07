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
import button from "../../../../assets/Icon/EmailSend.png";
import { Colors } from "../../../../Features/Colors";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../../../Features/Styles";

import { UserData, PostAnnounce, db } from "../../../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useauth } from "../../../../BACKEND/Auth";

export default function App({ route }) {
  const navigation = useNavigation();
  const currentuser = useauth();
  const { id, message, photo } = route.params;

  const [text, settext] = useState(message);
  const [Photo, setPhoto] = useState();

  const [PhotoURL, setPhotoURL] = useState();
  const [done, setdone] = useState(false);
  async function EditMessage(id) {
    const doclocation = doc(
      db,
      "Announce",
      "LltxTedBAbKMuN07tX6j",
      "Message",
      id
    );
    const newvalue = {
      message: text,
      time: serverTimestamp(),
    };
    await updateDoc(doclocation, newvalue);
  }
  //   const pickImage = async () => {
  //     // No permissions request is necessary for launching the image library
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       //changing the file from long data to short readable https
  //       const img = await fetch(result.uri);
  //       const bytes = await img.blob();
  //       //then set it as the image

  //       setPhoto(bytes);
  //       setPhotoURL(result.uri);
  //     }
  //   };
  function handleClick() {
    EditMessage(id);

    navigation.navigate("Tabs");
  }
  return (
    <View style={styles.container}>
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
      {/* <TouchableOpacity style={{ margin: 20 }} onPress={pickImage}>
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
      </TouchableOpacity> */}
    </View>
  );
}
