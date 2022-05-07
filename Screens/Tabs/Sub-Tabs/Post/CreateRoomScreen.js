import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from "react-native";
import { Colors } from "../../../../Features/Colors";
import { styles } from "../../../../Features/Styles";

import * as MediaLibrary from "expo-media-library";
import { AddRooms } from "../../../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../../../BACKEND/Auth";
import { PickImage } from "../../../../Features/Utils";
import {
  SuperButton,
  SuperIcons,
} from "../../../../components/SuperComp/SuperComp";

export default function App({ route }) {
  const navigation = useNavigation();
  const currentuser = useauth();
  const [text, settext] = useState();
  const [Photo, setPhoto] = useState();
  const [PhotoURL, setPhotoURL] = useState();
  const [loading, setloading] = useState();
  const [GalleryInfo, setGalleryInfo] = useState();

  const GetPhotos = async () => {
    await MediaLibrary.requestPermissionsAsync();
    await Camera.getCameraPermissionsAsync();
    const allphotos = await MediaLibrary.getAssetsAsync({
      mediaType: "photo",
    });
    setGalleryInfo(allphotos.assets);
  };
  useEffect(() => {
    GetPhotos();
  }, []);
  async function handleClick() {
    await AddRooms(Photo, text, [currentuser?.uid], currentuser?.uid);
    navigation.navigate("MyDrawer", {
      screen: "Tabs",
    });
  }
  const renderItem = ({ item }) => {
    return (
      <>
        <View>
          <TouchableOpacity
            onPress={() => PostImage(setPhoto, item?.uri, setPhotoURL)}
          >
            <Image
              source={{ uri: item?.uri }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 10,
                borderWidth: 1,
                marginHorizontal: 10,
                borderColor: Colors.black,
              }}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  };
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

          <View style={{ position: "absolute", right: 5 }}>
            <SuperButton
              text="Create"
              onPress={() => handleClick()}
              loading={loading}
              textstyle={{
                fontWeight: "bold",
                color: Colors.white,
                textAlign: "center",
              }}
              buttonstyle={[styles.submitbutton, { height: 30 }]}
            />
          </View>
        </View>
        {/* <View style={{ margin: 15, borderRadius: 10, marginTop: 40 }}>
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
        </View> */}

        <View style={styles.action}>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => PickImage(setPhoto, setPhotoURL)}
          >
            <ImageBackground
              source={{ uri: PhotoURL }}
              resizeMode="cover"
              style={{
                height: 50,
                width: 50,
                borderRadius: 20,
                backgroundColor: Colors.grey,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SuperIcons name="Gallery" size={20} color="black" />
            </ImageBackground>
          </TouchableOpacity>
          <TextInput
            placeholder="RoomName"
            placeholderTextColor={Colors.darkgrey}
            onChangeText={settext}
            maxLength={2000}
            value={text}
            style={[
              styles.textInput,
              {
                color: Colors.black,
              },
            ]}
          />
          <Text style={{ fontSize: 10, color: Colors.grey }}>
            {text?.length}/2000
          </Text>
        </View>
      </>
    </View>
  );
}
