import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Platform,
  AlertIOS,
  LogBox,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, Entypo, SimpleLineIcons } from "@expo/vector-icons";
import { useauth } from "../BACKEND/firebase";
import image from "../assets/Photos/Dummyphotos/netfliximage.png";
import checkcircle from "../assets/Photos/icons/CheckCircle.png";

import { Divider } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import AnnounceScreen from "../Screens/AnnounceScreen";
import ThreeDots from "../Components2/3dotComp";

export default function App({ navigation }) {
  const currentuser = useauth();
  console.log("USER:", currentuser);
  const [threedotvisible, setthreevisible] = useState(false);

  const [PhotoURL, setPhotoURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/sponcy-7003f.appspot.com/o/Person.png?alt=media&token=79018f26-8263-4230-8713-97c68a845570.png"
  );
  function showtoast(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      console.log("AlertIOS.alert(msg)");
    }
  }
  useEffect(() => {
    if (currentuser?.photoURL) {
      setPhotoURL(currentuser?.photoURL);
    }
  }, [currentuser]);
  const data2 = {
    name: "Logout",
    icon: "log-out-outline",
    id: "2",
  };
  const data1 = {
    name: "Settings",
    icon: "settings-sharp",
    id: "1",
  };
  const data3 = {
    name: "Edit",
    icon: "pencil",
    id: "3",
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor="#000"
        barStyle={"light-content"}
      />
      <ImageBackground
        source={{ uri: PhotoURL }}
        resizeMode="cover"
        style={{
          flex: 0.4,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}
      >
        <View style={{ backgroundColor: "", flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#909090" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={() => setthreevisible(!threedotvisible)}
          >
            <Entypo name="dots-three-vertical" size={24} color="#909090" />
          </TouchableOpacity>
          <View style={{ top: 30, position: "absolute", right: 18 }}>
            <ThreeDots
              visibility={threedotvisible}
              height={100}
              width={200}
              data2={data2}
              data1={data1}
              data3={data3}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={{ marginTop: 5 }}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "Roboto",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Netflix
            </Text>
            <Image
              style={{
                marginLeft: 10,
                height: 20,
                width: 20,
                marginBottom: 10,
              }}
              source={checkcircle}
            />
            <Text
              style={{
                position: "absolute",
                right: 10,
                fontFamily: "Roboto",
                fontSize: 15,
                fontWeight: "700",
                color: "#3262FF",
                marginBottom: 15,
              }}
            >
              Sponsorer
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "Roboto",
              fontSize: 15,
              fontWeight: "normal",
              color: "#3b3b3b",
            }}
          >
            Entertain the world
          </Text>
        </View>
        <Divider style={{ width: 1000 }} />
        <View style={{ marginTop: 5 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: 10,
                fontFamily: "Roboto",
                fontSize: 15,
                fontWeight: "300",
                fontStyle: "normal",
                color: "#00000099",
              }}
            >
              Followers
            </Text>
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>12k</Text>
            <View
              style={{
                position: "absolute",
                right: 10,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 15,
                  fontWeight: "300",
                  fontStyle: "normal",
                  color: "#00000099",
                }}
              >
                Sponsoring
              </Text>
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>12k</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FC8800",
                  height: 40,
                  width: 150,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  elevation: 3,
                }}
                onPress={() => showtoast("Following...")}
              >
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontWeight: "700",
                    fontStyle: "normal",
                    color: "#FFFFFF",
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: "absolute", right: 5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#327bff",
                  height: 40,
                  width: 150,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  elevation: 3,
                }}
                onPress={() => showtoast("Great! Ready to Sponsor")}
              >
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontSize: 16,
                    fontWeight: "700",
                    fontStyle: "normal",

                    color: "#FFFFFF",
                  }}
                >
                  Sponsor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text style={{ marginLeft: 10, color: "#3262FF", fontSize: 17 }}>
            Talk to him?
          </Text>
        </TouchableOpacity>
        <Divider style={{ width: 1000 }} />
      </View>

      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: "grey",

          indicatorStyle: {
            backgroundColor: "#FC8800",
          },
          labelStyle: {
            fontSize: 9,
          },
          style: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tab.Screen name="Posts" component={AnnounceScreen} />
        <Tab.Screen name="Reply" component={AnnounceScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
