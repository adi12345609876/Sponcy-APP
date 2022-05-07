import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Image,
  FlatList,
} from "react-native";
import { Colors } from "../../Features/Colors";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";
import { PostAnnounce } from "../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
import { useauth } from "../../BACKEND/Auth";
import {
  PickImage,
  PostImage,
  showtoast,
  TakeCameraPhoto,
} from "../../Features/Utils";
import { SuperButton, SuperIcons } from "../../components/SuperComp/SuperComp";
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { Camera } from "expo-camera";
export default function App() {
  const navigation = useNavigation();
  const currentuser = useauth();
  const [text, settext] = useState();
  const [Photo, setPhoto] = useState();
  const [loading, setloading] = useState();
  const [PhotoURL, setPhotoURL] = useState();
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
    if (text != undefined) {
      if (currentuser) {
        setloading(true);
        await PostAnnounce(
          Photo,
          text,
          currentuser?.uid,
          currentuser?.displayName,
          currentuser?.photoURL
        );
        setloading(false);
        navigation.navigate("MyDrawer");
      }
    } else {
      setloading(false);
      showtoast("Enter some text");
    }
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
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View
          style={{
            paddingTop: Constants.statusBarHeight + 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SuperIcons name={"Back-Arrow"} size={40} color={Colors.black} />
          </TouchableOpacity>

          <View style={{ marginRight: 10 }}>
            <SuperButton
              text={"Announce"}
              onPress={() => handleClick()}
              loading={loading}
              textstyle={{
                fontWeight: "bold",
                color: Colors.white,
              }}
              buttonstyle={styles.submitbutton}
            />
          </View>
        </View>
        <AnnounceItem
          icon={currentuser?.photoURL}
          message={text}
          photo={PhotoURL}
          name={currentuser?.displayName}
          user={currentuser}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                placeholder="Announce Thoughts..."
                style={styles.textInput}
                multiline
                maxLength={2000}
                onChangeText={settext}
                value={text}
                textAlign="left"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 15, color: Colors.grey, textAlign: "center" }}
          >
            Media
          </Text>
          <FlatList
            data={GalleryInfo}
            renderItem={renderItem}
            horizontal
            ListHeaderComponent={() => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    margin: 10,
                  }}
                  onPress={() => {
                    TakeCameraPhoto(setPhoto, setPhotoURL);
                    // GetPhotos();
                  }}
                >
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 20,
                      borderWidth: 3,
                      borderColor: Colors.primary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SuperIcons
                      name={"Camera"}
                      size={40}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => {
              return (
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    margin: 10,
                  }}
                  onPress={() => {
                    PickImage(setPhoto, setPhotoURL);
                  }}
                >
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 20,
                      borderWidth: 3,
                      borderColor: Colors.primary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SuperIcons
                      name={"Gallery"}
                      size={40}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inner: {
    padding: 24,
    flex: 1,
    // justifyContent: "space-around",
    justifyContent: "flex-end",
  },
  // header: {
  //   fontSize: 36,
  //   marginBottom: 48,
  // },
  textInput: {
    maxHeight: 100,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
    // width: deviceWidth / 1.5,
    color: Colors.black,
    fontSize: 17,
  },
  btnContainer: {
    backgroundColor: "white",
    // marginTop: 12,
  },
});
// <KeyboardAvoidingView
//   style={[styles.Postcontainer, { flex: 1 }]}
//   behavior="height"
// >
//   <View
//     style={{
//       flexDirection: "row",
//       alignItems: "center",
//     }}
//   >
//     <View style={{ marginLeft: 10 }}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back-outline" size={30} color={Colors.black} />
//       </TouchableOpacity>
//     </View>
//     <View style={{ position: "absolute", right: 10 }}>
//       <SuperButton
//         text={"Announce"}
//         onPress={() => handleClick()}
//         loading={loading}
//         image={button}
//         textstyle={{
//           marginRight: 14,
//           marginBottom: 10,
//           fontWeight: "bold",
//           color: Colors.white,
//         }}
//         buttonstyle={styles.submitbutton}
//       />
//     </View>
//   </View>

//   <View style={[styles.action]}>
//     <Entypo name="text" size={24} color="black" />
//     <TextInput
//       placeholder="Your Username"
//       placeholderTextColor={Colors.grey}
//       onChangeText={settext}
//       multiline
//       maxLength={200}
//       value={text}
//       style={[
//         styles.textInput,
//         {
//           color: Colors.black,
//         },
//       ]}
//     />
//     <Text style={{ fontSize: 10, color: Colors.grey }}>
//       {text?.length}/200
//     </Text>
//   </View>
//   <TouchableOpacity
//     style={{
//       justifyContent: "center",
//       alignItems: "center",
//     }}
//     onPress={() => {
//       PickImage(setPhoto, setPhotoURL);
//     }}
//   >
//     <ImageBackground
//       source={{ uri: PhotoURL ? PhotoURL : null }}
//       resizeMode="cover"
//       style={{
//         height: 100,
//         width: 100,
//         borderRadius: 20,
//         borderWidth: 3,
//         borderColor: Colors.primary,
//         justifyContent: "center",

//         alignItems: "center",
//       }}
//     >
//       <Entypo name="camera" size={24} color={Colors.primary} />
//     </ImageBackground>
//   </TouchableOpacity>
// </KeyboardAvoidingView>;
