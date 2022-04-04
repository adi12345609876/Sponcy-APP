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
import { useTabBar } from "../../Hooks/TabBarprovider";
import { Entypo, Ionicons, EvilIcons } from "@expo/vector-icons";
import ThreeDots from "../../components/SuperComp/3dotComp";
import { Colors } from "../../Features/Features";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { UserData } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { useRoute } from "@react-navigation/native";
import { Searchbar } from "react-native-paper";
export default function Header() {
  const [searchText, setsearchText] = useState();
  const [ShowSearch, setShowSearch] = useState(false);

  const route = useRoute();
  console.log("CURRENT SCREEN", route.name);
  const currentuser = useauth();
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
  function HandleSearch() {
    console.log("searchText", searchText);
    setShowSearch(false);
  }
  function HandleChangeText(text) {
    console.log("searchText", text);
    setsearchText(text);
  }
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
        onPress={() =>
          navigation.navigate("Portfolio", {
            useruid: currentuser?.uid,
          })
        }
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
        onPress={() =>
          navigation.navigate("SearchScreen", {
            ScreenName: route.name,
          })
        }
      >
        <EvilIcons name="search" size={35} color="black" />
      </TouchableOpacity>
      {/* {ShowSearch && (
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => HandleChangeText(text)}
            value={searchText}
            onIconPress={() => HandleSearch()}
          />
        </View>
      )} */}

      <TouchableOpacity
        style={{ top: 10 }}
        onPress={() => setthreevisible(!threedotvisible)}
      >
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>

      <View style={{ top: 75, position: "absolute", right: 15 }}>
        <ThreeDots
          visibility={threedotvisible}
          height={100}
          width={200}
          data={[
            { text: "text1", icon: "pencil", func: () => {} },
            { text: "text2", icon: "trash", func: () => {} },
          ]}
        />
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
