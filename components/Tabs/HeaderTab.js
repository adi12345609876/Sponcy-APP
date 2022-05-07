import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Text,
  View,
} from "react-native";
import { useTabBar } from "../../Hooks/TabBarprovider";
import { Colors } from "../../Features/Colors";
import Constants from "expo-constants";
import { useauth } from "../../BACKEND/Auth";
import { useRoute } from "@react-navigation/native";
import SponcyImage from "../../assets/Sponcy.png";

import { Avatar } from "react-native-paper";
import { LOGO_HEIGHT, statusBarHeight } from "../../Features/GlobalConsts";
import { getNotifies } from "../../BACKEND/firebase";
import Notificationbutton from "../SuperComp/NotificationButton";
const Notifyicon = require("../../assets/Icon/Notify.png");
// const NotifyiconX = require("./assets/Icon/NotifyX.png");

export default function Header({ navigation }) {
  const route = useRoute();
  const currentuser = useauth();
  const Notifies = getNotifies(currentuser?.uid);
  const [NotifiesCount, setNotifiesCount] = React.useState();
  // const currentUserData = UserData();
  // const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const { showTabBar } = useTabBar();

  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);
  useEffect(() => {
    const TotalNotifies = Notifies?.filter((item) => {
      return item?.Seen == false;
    }).length;
    setNotifiesCount(TotalNotifies);
  }, [Notifies]);

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
        <Avatar.Image
          size={50}
          source={{
            uri: currentuser?.photoURL ? currentuser?.photoURL : null,
          }}
          style={{ backgroundColor: Colors.grey }}
        />
        {/* <Image
          source={{
            uri: currentuser?.photoURL ? currentuser?.photoURL : null,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 200,
          }}
        /> */}
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
        style={{ top: 5 }}
        onPress={() => navigation.navigate("NotifyScreen")}
      >
        <Image source={Notifyicon} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      {NotifiesCount != 0 && (
        <View style={{ position: "absolute", right: 0, top: 10 }}>
          <Notificationbutton number={NotifiesCount} />
        </View>
      )}
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
    marginTop: statusBarHeight - 10,
  },
  logo: {
    paddingTop: statusBarHeight + 40,
    paddingBottom: 0,
    //width = 3*height
    height: LOGO_HEIGHT,
    width: 3 * LOGO_HEIGHT,
  },
});
