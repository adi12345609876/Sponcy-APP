import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useTabBar } from "../Hooks/TabBarprovider";
import { Entypo, Ionicons, EvilIcons } from "@expo/vector-icons";
import ThreeDots from "../Components2/3dotComp";
import { Colors } from "../Features/Features";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useauth, UserData } from "../BACKEND/firebase";
export default function Header() {
  const currentUserData = UserData();
  const navigation = useNavigation();

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
        onPress={() => navigation.navigate("Portfolio")}
      >
        <Image
          source={{
            uri: currentUserData?.array?.PhotoURL,
          }}
          style={{ width: 50, height: 50, borderRadius: 200 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ maxHeight: 120, height: 120 }}
        onPress={() => navigation.navigate("Tabs")}
      >
        <Text style={styles.logo}>Sponcy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ top: 10 }}
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <EvilIcons name="search" size={35} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ top: 10 }}
        onPress={() => setthreevisible(!threedotvisible)}
      >
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>

      <View style={{ top: 75, position: "absolute", right: 15 }}>
        <ThreeDots visibility={threedotvisible} height={100} width={200} />
      </View>
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
  },
  logo: {
    fontFamily: "Pacifico",
    fontSize: Constants.statusBarHeight + 5,
    color: Colors.primary,
    // fontStyle: 'normal',
    fontWeight: "400",
    textAlign: "center",
    margin: 15,
    justifyContent: "flex-end",
    // marginTop: 0,
  },
});
