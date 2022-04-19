// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";
// import React from "react";
// import { Button, View } from "react-native";
// export default function DrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       {/* <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.closeDrawer()}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.toggleDrawer()}
//       /> */}
//     </DrawerContentScrollView>
//   );
// }
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { logout, useauth } from "../../BACKEND/Auth";
import { HandleShare } from "../../Features/Utils";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Features/Colors";

const CustomDrawer = (props) => {
  const currentuser = useauth();
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <ImageBackground
          source={require("../../assets/Photos/Drawer-bg.jpeg")}
          style={{ padding: 20 }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Portfolio", {
                useruid: currentuser?.uid,
              })
            }
          >
            <Image
              source={{ uri: currentuser?.photoURL }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
                borderWidth: 3,
                borderColor: Colors.black,
              }}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontFamily: "Roboto-Medium",
                marginBottom: 5,
              }}
            >
              {currentuser?.displayName}
            </Text>
          </TouchableOpacity>

          {/* <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                fontFamily: "Roboto-Regular",
                marginRight: 5,
              }}
            >
              280 Coins
            </Text>
            <FontAwesome5 name="coins" size={14} color="#fff" />
          </View> */}
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => HandleShare()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Invite Your Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto-Medium",
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
