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

import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { logout, useauth } from "../../BACKEND/Auth";
import {
  Feedbacksender,
  GotoTwitter,
  GoToYoutube,
  HandleShare,
  handletoTwitter,
} from "../../Features/Utils";
import { useNavigation } from "@react-navigation/native";
import { Colors, SocilaColors } from "../../Features/Colors";
import SocialIcon, { SuperIcons } from "../SuperComp/SuperComp";

const CustomDrawer = (props) => {
  const currentuser = useauth();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: "#8200d6" }}
      >
        <View
          // source={require("../../assets/Photos/Drawer-bg.jpeg")}
          style={{
            padding: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Portfolio", {
                useruid: currentuser?.uid,
              })
            }
          >
            <Image
              source={{
                uri: currentuser?.photoURL ? currentuser?.photoURL : null,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                marginBottom: 10,
                borderColor: Colors.black,
                backgroundColor: Colors.grey,
                elevation: 20,
                borderWidth: 2,
              }}
            />

            <Text
              style={{
                color: Colors.black,
                fontSize: 18,
                fontFamily: "Roboto",
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
        </View>

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
            <SuperIcons name={"Share"} size={30} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto",
                marginLeft: 5,
              }}
            >
              Invite Your Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Feedbacksender()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SuperIcons name={"Edit"} size={30} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto",
                marginLeft: 5,
              }}
            >
              FeedBack
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SuperIcons name={"Logout"} size={30} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto",
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <SocialIcon
            name="twitter"
            onPress={() => GotoTwitter()}
            color={Colors.white}
            size={30}
            aroundstyles={{
              backgroundColor: SocilaColors.twitter,
              width: 40,
              borderRadius: 10,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <SocialIcon
            name="youtube"
            onPress={() => GoToYoutube()}
            color={Colors.white}
            size={30}
            aroundstyles={{
              backgroundColor: SocilaColors.youtube,
              width: 40,
              borderRadius: 10,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
