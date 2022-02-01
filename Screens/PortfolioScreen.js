import React, { useState } from "react";
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
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  useauth,
  useprofilephoto,
  useuser,
  UserData,
} from "../BACKEND/firebase";
import checkcircle from "../assets/Photos/icons/CheckCircle.png";

import { Divider } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import AnnounceScreen from "../Screens/AnnounceScreen";
import ThreeDots from "../Components2/3dotComp";
import { Colors } from "../Features/Features";
import { query, where } from "firebase/firestore";
export default function App({ navigation }) {
  const currentuser = useauth();

  const currentUserData = UserData();
  const [threedotvisible, setthreevisible] = useState(false);

  function showtoast(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
    }
  }
  console.log(currentUserData?.array);

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
  function numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return num / 1000 + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return num / 1000000 + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
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
      <ImageBackground
        source={{ uri: currentUserData?.array?.PhotoURL }}
        resizeMode="cover"
        style={{
          flex: 0.4,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          backgroundColor: Colors.white,
        }}
      >
        <View style={{ backgroundColor: "", flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={() => setthreevisible(!threedotvisible)}
          >
            <Entypo name="dots-three-vertical" size={24} color={Colors.grey} />
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
              {currentUserData?.array?.UserName}
            </Text>
            {currentUserData?.array?.checked ? (
              <Image
                style={{
                  marginLeft: 10,
                  height: 20,
                  width: 20,
                  marginBottom: 10,
                }}
                source={checkcircle}
              />
            ) : null}
            <Text
              style={{
                position: "absolute",
                right: 10,
                fontFamily: "Roboto",
                fontSize: 15,
                fontWeight: "700",
                color: Colors.secondary,
                marginBottom: 15,
              }}
            >
              {currentUserData?.array?.Status}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: "Roboto",
              fontSize: 15,
              fontWeight: "normal",
              color: Colors.grey,
            }}
          >
            {currentUserData?.array?.Slogan}
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
                color: Colors.black,
              }}
            >
              Followers
            </Text>
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              {numFormatter(currentUserData?.array?.Followers)}
            </Text>
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
                  color: Colors.black,
                }}
              >
                Sponsoring
              </Text>
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                {numFormatter(currentUserData?.array?.Sponsoring)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
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
                    color: Colors.white,
                  }}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ position: "absolute", right: 5 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.secondary,
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

                    color: Colors.white,
                  }}
                >
                  Sponsor
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text
            style={{ marginLeft: 10, color: Colors.secondary, fontSize: 17 }}
          >
            Talk to him?
          </Text>
        </TouchableOpacity>
        <Divider style={{ width: 1000 }} />
      </View>

      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: Colors.grey,

          indicatorStyle: {
            backgroundColor: Colors.primary,
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
