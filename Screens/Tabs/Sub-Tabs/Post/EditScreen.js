import React, { useState } from "react";
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { styles } from "../../../../Features/Styles";

import { SpecifiedUserData } from "../../../../BACKEND/firebase";
import { updateUser } from "../../../../BACKEND/Auth";
import { useauth } from "../../../../BACKEND/Auth";
import { Colors } from "../../../../Features/Colors";
import { PickImage } from "../../../../Features/Utils";
import { SuperButton } from "../../../../components/SuperComp/SuperComp";

export default function App({ navigation }) {
  const currentuser = useauth();

  const specificuserdata = SpecifiedUserData(currentuser?.uid);
  const [Photo, setPhoto] = useState();
  const [DisplayName, setDisplayName] = useState();
  const [Bio, setBio] = useState();
  const [Work, setWork] = useState("");
  const [loading, setloading] = useState();
  // const specificuserdata = UserData();
  const [PhotoURL, setPhotoURL] = useState("");

  async function handleClick() {
    console.log("Photo", Photo);
    setloading(true);
    await updateUser(
      DisplayName ? DisplayName : currentuser?.displayName,
      Photo,
      Bio ? Bio : specificuserdata?.Biodata,
      Work ? Work : specificuserdata?.Work,
      currentuser,
      true
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
              uri: PhotoURL != "" ? PhotoURL : specificuserdata?.PhotoURL,
            }}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              backgroundColor: Colors.grey,
              borderRadius: 20,
            }}
          >
            <View
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
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 5 }}>
        <>
          <Text
            style={[
              styles.text_footer,
              {
                color: Colors.black,
                marginTop: 20,
              },
            ]}
          >
            Username*
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={Colors.black} size={20} />
            <TextInput
              placeholder="Your Username"
              placeholderTextColor={Colors.grey}
              onChangeText={setDisplayName}
              maxLength={15}
              value={DisplayName ? DisplayName : currentuser?.displayName}
              style={[
                styles.textInput,
                {
                  color: Colors.black,
                  fontWeight: "bold",
                },
              ]}
            />
            <Text style={{ fontSize: 10, color: Colors.grey }}>
              {DisplayName?.length}/15
            </Text>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: "Roboto",
                fontSize: 25,
                fontWeight: "bold",
              }}
              placeholder="Name"
              onChangeText={setDisplayName}
              maxLength={15}
              value={DisplayName ? DisplayName : currentuser?.displayName}
            />
            <Text
              style={[styles.text, { textAlign: "right", color: Colors.grey }]}
            >
              {DisplayName?.length}/15
            </Text>
          </View> */}
          <>
            <Text
              style={[
                styles.text_footer,
                {
                  color: Colors.black,
                  marginTop: 20,
                },
              ]}
            >
              Your Skills*
            </Text>
            <View style={styles.action}>
              <MaterialIcons
                name="work-outline"
                color={Colors.black}
                size={20}
              />
              <TextInput
                placeholderTextColor={Colors.grey}
                placeholder="Your Skills.."
                multiline
                onChangeText={setWork}
                maxLength={60}
                value={Work ? Work : specificuserdata?.Work}
                style={[
                  styles.textInput,
                  {
                    color: Colors.black,
                    fontWeight: "bold",
                  },
                ]}
              />
              <Text style={{ fontSize: 10, color: Colors.grey }}>
                {Work?.length}/60
              </Text>
            </View>
          </>
          <>
            <Text
              style={[
                styles.text_footer,
                {
                  color: Colors.black,
                  marginTop: 20,
                },
              ]}
            >
              Your Bio
            </Text>
            <View style={styles.action}>
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholderTextColor={Colors.grey}
                placeholder="Your Bio"
                onChangeText={setBio}
                multiline
                maxLength={50}
                value={Bio ? Bio : specificuserdata?.Biodata}
                style={[
                  styles.textInput,
                  {
                    color: Colors.black,
                    fontWeight: "bold",
                  },
                ]}
              />
              <Text style={{ fontSize: 10, color: Colors.grey }}>
                {Bio?.length}/50
              </Text>
            </View>
          </>

          {/* <View>
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: "Roboto",
                fontSize: 25,
                fontWeight: "bold",
              }}
              placeholder="Your Bio..."
              onChangeText={setBio}
              maxLength={50}
              value={Bio ? Bio : specificuserdata?.Biodata}
            />
            <Text
              style={[styles.text, { textAlign: "right", color: Colors.grey }]}
            >
              {Bio?.length}/50
            </Text>
          </View> */}

          {/* <View>
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: "Roboto",
                fontSize: 25,
                fontWeight: "bold",
              }}
              placeholder="Your Skills.."
              onChangeText={setWork}
              value={Work ? Work : specificuserdata?.Work}
              maxLength={60}
            />
            <Text
              style={[styles.text, { textAlign: "right", color: Colors.grey }]}
            >
              {Work?.length}/60
            </Text>
          </View> */}
        </>
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
