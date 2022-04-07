import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { SpecifiedUserData, Sponsor } from "../../../../BACKEND/firebase";
import {
  FollowUser,
  UnFollowUser,
  getUserDetailsCollection,
  SponsorUser,
} from "../../../../BACKEND/Announce";
// import checkcircle from "../../../../assets/Photos/icons/CheckCircle.png";
import { logout, useauth } from "../../../../BACKEND/Auth";
import { Divider } from "react-native-elements";
import ThreeDots from "../../../../components/SuperComp/3dotComp";
import { Colors } from "../../../../Features/Colors";
import PortfolioTab from "../../../../components/Tabs/PortfolioTab";
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../../../../Hooks/GlobalHooks";
import { showtoast } from "../../../../Features/Utils";
import { styles } from "../../../../Features/Styles";

export default function App({ route }) {
  const navigation = useNavigation();
  const { useruid } = route.params;
  const specificuserdata = SpecifiedUserData(useruid);
  const userdetails = getUserDetailsCollection(useruid);
  const currentuser = useauth();

  //  const FormattedLikes = numFormatter(likes);

  const [threedotvisible, setthreevisible] = useState(false);
  const [alreadyfollwing, setalreadyfollwing] = useState();

  useEffect(() => {
    if (userdetails) {
      userdetails?.then((doc) => {
        setalreadyfollwing(doc?.Followers.includes(currentuser?.uid));
      });
    }
  }, [userdetails]);

  async function handleFollow() {
    showtoast("Following");

    FollowUser(currentuser?.uid, specificuserdata?.uid);
  }
  async function handleUnFollow() {
    UnFollowUser(currentuser?.uid, specificuserdata?.uid);
  }
  function TalkPrivately() {
    navigation.navigate("Chat", {
      name: specificuserdata?.UserName,
      icon: specificuserdata?.PhotoURL,
      id: useruid,
      onechat: true,
    });
  }
  async function SponsorUsers() {
    showtoast("Ready to sponsor");
    SponsorUser(currentuser?.uid, specificuserdata?.uid);
    navigation.navigate("Chat", {
      name: specificuserdata?.UserName,
      icon: specificuserdata?.PhotoURL,
      id: useruid,
      onechat: true,
      Sponsor: true,
    });
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
        source={specificuserdata?.PhotoURL}
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
              data={[
                {
                  text: "Settings",
                  icon: "settings-sharp",
                  func: () => {},
                },
                {
                  text: "Logout",
                  icon: "log-out-outline",
                  func: () => logout(),
                },
                {
                  text: "Edit",
                  icon: "pencil",
                  func: () => navigation.navigate("Edit"),
                },
              ]}
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
              {specificuserdata?.UserName}
            </Text>

            {/* {specificuserdata?.checked ? (
              <Image
                style={{
                  marginLeft: 10,
                  height: 20,
                  width: 20,
                  marginBottom: 10,
                }}
                source={checkcircle}
              />
            ) : null} */}
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
              {specificuserdata?.Status}
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
            {specificuserdata?.Slogan}
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
              {numFormatter(specificuserdata?.Followers)}
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
                {numFormatter(specificuserdata?.Sponsoring)}
              </Text>
            </View>
          </View>
        </View>
        {/* {useruid != currentuser?.uid && ( */}
        <>
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 5 }}>
                {alreadyfollwing ? (
                  <>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.grey,
                        height: 40,
                        width: 150,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        elevation: 3,
                      }}
                      onPress={() => handleUnFollow()}
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
                        UnFollow
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
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
                      onPress={() => handleFollow()}
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
                  </>
                )}
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
                  onPress={() => SponsorUsers()}
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
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => TalkPrivately()}
          >
            <Text
              style={{
                marginLeft: 10,
                color: Colors.secondary,
                fontSize: 17,
              }}
            >
              Talk to him?
            </Text>
          </TouchableOpacity>
        </>
        {/* )} */}

        <Divider style={{ width: 1000 }} />
      </View>

      {/* <Tab.Navigator
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
      </Tab.Navigator> */}
      <PortfolioTab useruid={useruid} />
    </View>
  );
}
