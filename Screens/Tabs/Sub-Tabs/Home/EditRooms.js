import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import button from "../../../../assets/Icon/EmailSend.png";
import { Colors } from "../../../../Features/Colors";
import { styles } from "../../../../Features/Styles";

import { EditRoom } from "../../../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../../../BACKEND/Auth";
import { PickImage } from "../../../../Features/Utils";
import { SuperIcons } from "../../../../components/SuperComp/SuperComp";

export default function App({ route }) {
  const { selectedIds } = route.params;
  const { name, icon, id, participants } = route.params;

  const navigation = useNavigation();

  const [text, settext] = useState(name);
  const [docid, setdocid] = useState(id);

  const [Photo, setPhoto] = useState(icon);
  const [SelectedId, setSelectedId] = useState(
    selectedIds ? selectedIds : participants
  );

  const [PhotoURL, setPhotoURL] = useState();
  //   const [done, setdone] = useState(false);

  async function handleClick() {
    await EditRoom(docid, text, Photo, [...selectedIds]);
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
              <SuperIcons name={"Back-Arrow"} size={50} color={Colors.black} />
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
                  color: Colors.white,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
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
        <View style={{ margin: 15, borderRadius: 10, marginTop: 40 }}>
          <TouchableOpacity
            style={{
              height: 100,
              backgroundColor: Colors.primary,

              borderRadius: 10,
              padding: 12,
            }}
            onPress={() =>
              navigation.navigate("Editparticipants", { SelectedId })
            }
          >
            <Text>Add Participants</Text>
          </TouchableOpacity>
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
