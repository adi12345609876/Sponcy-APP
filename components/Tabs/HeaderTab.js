import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Button,
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
          top: 10,
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
          source={{ uri: currentuser?.photoURL }}
          style={{ width: 50, height: 50, borderRadius: 200 }}
        />
      </TouchableOpacity>
      {/* <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
      <TouchableOpacity
        style={{
          maxHeight: 120,
          height: 120,

          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("Tabs", {
            screen: "Announce",
          })
        }
      >
        <Image source={SponcyImage} resizeMode="cover" style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ top: 10 }}
        onPress={() =>
          navigation.navigate("SearchScreen", {
            ScreenName: route.name,
          })
        }
      >
        <EvilIcons name="search" size={35} color="black" />
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
    height: 90,
    elevation: 2,
    borderRadius: 10,
    marginTop: Constants.statusBarHeight,
  },
  logo: {
    paddingTop: Constants.statusBarHeight + 50,
    paddingBottom: 0,
  },
});
