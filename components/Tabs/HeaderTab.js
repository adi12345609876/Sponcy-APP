import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Button,
  SafeAreaView,
} from "react-native";
import { useTabBar } from "../../Hooks/TabBarprovider";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import ThreeDots from "../../components/SuperComp/3dotComp";
import { Colors } from "../../Features/Colors";
import Constants from "expo-constants";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { UserData } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { useRoute } from "@react-navigation/native";
import SponcyImage from "../../assets/Sponcy.png";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
const Notifyicon = require("../../assets/Icon/Notify.png");
// const NotifyiconX = require("./assets/Icon/NotifyX.png");
const LOGO_HEIGHT = 50;
export default function Header({ navigation }) {
  const route = useRoute();
  const currentuser = useauth();
  // const currentUserData = UserData();
  // const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const { showTabBar } = useTabBar();
  const [threedotvisible, setthreevisible] = useState(false);
  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setthreevisible(false);
    } else {
      Animated.timing(animation, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setthreevisible(false);
    }
  };

  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);
  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: animation }] }]}
    >
      <TouchableOpacity
        style={{
          top: 0,
          borderRadius: 200,
          borderWidth: 2,
          backgroundColor: Colors.grey,
        }}
        onPress={() => navigation.openDrawer()}
        // onPress={() =>
        //   navigation.navigate("Portfolio", {
        //     useruid: currentuser?.uid,
        //   })
        // }
      >
        <Image
          source={{
            uri: currentuser?.photoURL ? currentuser?.photoURL : null,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 200,
          }}
        />
      </TouchableOpacity>
      {/* <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
      <TouchableOpacity
        style={{
          height: 10,
          justifyContent: "center",
          alignItems: "center",
          top: 0,
        }}
        onPress={() =>
          navigation.navigate("MyDrawer", {
            screen: "Tabs",
          })
        }
      >
        <Image source={SponcyImage} resizeMode="cover" style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ top: 10 }}
        onPress={() => navigation.navigate("NotifyScreen")}
      >
        <Image source={Notifyicon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    width: "100%",
    height: 70,
    elevation: 2,
    borderRadius: 10,
    marginTop: Constants.statusBarHeight - 10,
  },
  logo: {
    paddingTop: Constants.statusBarHeight + 40,
    paddingBottom: 0,
    //width = 3*height
    height: LOGO_HEIGHT,
    width: 3 * LOGO_HEIGHT,
  },
});
