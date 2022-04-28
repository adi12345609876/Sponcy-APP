import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
// import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../Features/Colors";
import React, { useState } from "react";
import Constants from "expo-constants";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import { styles } from "../../Features/Styles";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { updateUser } from "../../BACKEND/Auth";

import { useauth } from "../../BACKEND/Auth";
import nullPhoto from "../../assets/Photos/null.png";
import { useNavigation } from "@react-navigation/native";
import { PickImage } from "../../Features/Utils";
import { SuperButton } from "../../components/SuperComp/SuperComp";
import { UseState } from "../../Hooks/StateContext";
const SignInScreen = () => {
  const navigation = useNavigation();
  const currentuser = useauth();
  const [Photo, setPhoto] = useState("");
  const [DisplayName, setDisplayName] = useState("");
  const [Bio, setBio] = useState("");
  const [Work, setWork] = useState("");

  const [PhotoURL, setPhotoURL] = useState();
  const [loading, setloading] = useState(false);
  const { LogedIn, setLogedIn } = UseState();
  async function handleClick() {
    setloading(true);
    await updateUser(
      DisplayName,
      Photo ? Photo : nullPhoto,
      Bio,
      Work,
      currentuser,
      false
    );
    setloading(false);
    setLogedIn("SignedIN");
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: Colors.white,
          },
        ]}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => PickImage(setPhoto, setPhotoURL)}>
            <ImageBackground
              source={{ uri: PhotoURL ? PhotoURL : null }}
              resizeMode="cover"
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                // backgroundColor: Colors.grey,
                justifyContent: "center",
                alignItems: "center",
                borderColor: Colors.grey,
                borderWidth: 1,
              }}
            >
              <MaterialIcons name="photo-camera-back" size={24} color="grey" />
            </ImageBackground>
          </TouchableOpacity>
        </View>
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
            value={DisplayName}
            style={[
              styles.textInput,
              {
                color: Colors.black,
              },
            ]}
          />
          <Text style={{ fontSize: 10, color: Colors.grey }}>
            {DisplayName?.length}/15
          </Text>

          {/* <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View> */}
        </View>

        {/* <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Username must be 4 characters long.
          </Text>
        </Animatable.View> */}

        <Text
          style={[
            styles.text_footer,
            {
              color: Colors.black,
              marginTop: 35,
            },
          ]}
        >
          Skills*
        </Text>
        <View style={styles.action}>
          <MaterialIcons name="work-outline" color={Colors.black} size={20} />
          <TextInput
            placeholder="Your Skills"
            placeholderTextColor={Colors.grey}
            style={[
              styles.textInput,
              {
                color: Colors.black,
              },
            ]}
            onChangeText={setWork}
            maxLength={15}
            value={Work}
          />
          <Text style={{ fontSize: 10, color: Colors.grey }}>
            {Work?.length}/15
          </Text>
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              color: Colors.black,
              marginTop: 35,
            },
          ]}
        >
          Bio
        </Text>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="newspaper-variant-outline"
            size={24}
            color="black"
          />
          <TextInput
            placeholder="Your Skills"
            placeholderTextColor={Colors.grey}
            style={[
              styles.textInput,
              {
                color: Colors.black,
              },
            ]}
            onChangeText={setBio}
            maxLength={20}
            value={Bio}
          />
          <Text style={{ fontSize: 10, color: Colors.grey }}>
            {Bio?.length}/20
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {}}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleClick()}
            disabled={!DisplayName || !Work}
            style={[
              styles.signIn,
              {
                borderColor: Colors.primary,
                borderWidth: 1,
                marginBottom: 10,
                position: "absolute",
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text
                style={[
                  styles.textSign,
                  {
                    color: Colors.primary,
                  },
                ]}
              >
                Done
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

//             <TextInput
//               style={{
//                 marginLeft: 10,
//                 fontFamily: "Roboto",
//                 fontSize: 25,
//                 fontWeight: "bold",
//               }}
//               placeholder="Name"
//               onChangeText={setDisplayName}
//               maxLength={10}
//               value={DisplayName}
//             />
//             <Text
//               style={[styles.text, { textAlign: "right", color: Colors.grey }]}
//             >
//               {DisplayName?.length}/10
//             </Text>
//           </View>
//           <View>
//             <TextInput
//               style={{
//                 marginLeft: 10,
//                 fontFamily: "Roboto",
//                 fontSize: 25,
//                 fontWeight: "bold",
//               }}
//               placeholder="Your Bio..."
//               onChangeText={setBio}
//               maxLength={20}
//               value={Bio}
//             />
//             <Text
//               style={[styles.text, { textAlign: "right", color: Colors.grey }]}
//             >
//               {Bio?.length}/20
//             </Text>
//           </View>
//           <View>
//             <TextInput
//               style={{
//                 marginLeft: 10,
//                 fontFamily: "Roboto",
//                 fontSize: 25,
//                 fontWeight: "bold",
//               }}
//               placeholder="Your Work.."
//               onChangeText={setWork}
//               value={Work}
//               maxLength={15}
//             />
//             <Text
//               style={[styles.text, { textAlign: "right", color: Colors.grey }]}
//             >
//               {Work?.length}/15
//             </Text>
//           </View>
//         </View>
//       </View>
//       <View style={{ position: "absolute", right: 20, bottom: 20 }}>
//         <SuperButton
//           text={"Done"}
//           onPress={() => handleClick()}
//           loading={loading}
//           buttonstyle={{
//             backgroundColor: !DisplayName ? Colors.grey : "orange",
//             height: 50,
//             width: 100,
//             justifyContent: "center",
//             alignItems: "center",
//             borderRadius: 10,
//           }}
//           textstyle={{
//             fontWeight: "bold",
//             fontSize: 20,
//             color: Colors.black,
//           }}
//         />
//       </View>
//     </View>
//   );
// }
