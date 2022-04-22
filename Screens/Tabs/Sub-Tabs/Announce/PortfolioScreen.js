import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { SpecifiedUserData } from "../../../../BACKEND/firebase";
import {
  FollowUser,
  UnFollowUser,
  getUserDetailsCollection,
  HireUser,
} from "../../../../BACKEND/Announce";
// import checkcircle from "../../../../assets/Photos/icons/CheckCircle.png";
import { logout, useauth } from "../../../../BACKEND/Auth";
import { Divider } from "react-native-elements";
import ThreeDots from "../../../../components/SuperComp/3dotComp";
import { Colors } from "../../../../Features/Colors";
import PortfolioTab from "../../../../components/Tabs/PortfolioTab";
import { useNavigation } from "@react-navigation/native";
import { numFormatter } from "../../../../Hooks/GlobalHooks";
import { sendNotification, showtoast } from "../../../../Features/Utils";
import { styles } from "../../../../Features/Styles";
import * as Updates from "expo-updates";
export default function App({ route }) {
  const navigation = useNavigation();
  const { useruid } = route.params;
  const specificuserdata = SpecifiedUserData(useruid);
  const userdetails = getUserDetailsCollection(useruid);
  const currentuser = useauth();
  const [threedotvisible, setthreevisible] = useState();
  const [alreadyfollwing, setalreadyfollwing] = useState();

  useEffect(() => {
    setalreadyfollwing(specificuserdata?.Followers?.includes(currentuser?.uid));
  }, [userdetails]);

  async function handleFollow() {
    FollowUser(currentuser?.uid, specificuserdata?.uid);
    showtoast("Following");
  }
  async function handleLogout() {
    showtoast("Loged out");
    logout();
    navigation.navigate("SignIn");
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
  async function HireUsers() {
    sendNotification(
      specificuserdata?.expoToken,
      `🚨Hire Offer🚨`,
      `${currentuser?.displayName} is willing to hire`
    );
    showtoast("Ready to Hire");
    // SponsorUser(currentuser?.uid, specificuserdata?.uid);

    // navigation.navigate("Chat", {
    //   name: specificuserdata?.UserName,
    //   icon: specificuserdata?.PhotoURL,
    //   id: useruid,
    //   onechat: true,
    //   Hire: true,
    // });
  }
  async function UpdateApp() {
    showtoast("Updating....");

    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        showtoast("Updating....");

        await Updates.reloadAsync();
      } else {
        showtoast("no updates");
      }
    } catch (e) {
      showtoast("An error occured");
    }
  }

  return (
    <View
      style={{
        flex: 0.5,
        paddingTop: Constants.statusBarHeight / 10,
        backgroundColor: Colors.white,
      }}
    >
      <StatusBar
        animated={true}
        backgroundColor={Colors.black}
        barStyle={"light-content"}
      />
      <View
        style={{
          flexDirection: "row",

          height: 25,
        }}
      >
        <TouchableOpacity
          style={[styles.Searchbox, { marginLeft: 10, position: "absolute" }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Searchbox,
            { position: "absolute", marginRight: 10, right: 10 },
          ]}
          onPress={() => setthreevisible(!threedotvisible)}
        >
          <Entypo name="dots-three-vertical" size={24} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.4,
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          backgroundColor: Colors.white,
        }}
      ></View>
      <View style={{}}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 130,
              width: 130,
              borderRadius: 20,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: Colors.black,
              // position: "relative",
            }}
          >
            <Image
              source={{
                uri: specificuserdata?.PhotoURL
                  ? specificuserdata?.PhotoURL
                  : null,
              }}
              style={{
                height: 130,
                width: 130,
                borderRadius: 20,
                marginBottom: 10,
                borderColor: Colors.black,
              }}
            />
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
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
            {specificuserdata?.Biodata}
          </Text>
          {specificuserdata?.Work && (
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="work" size={24} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Roboto",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {specificuserdata?.Work}
              </Text>
            </View>
          )}
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

            {/* <View
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
                Hireing
              </Text>
              <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                {numFormatter(specificuserdata?.Hireing)}
              </Text>
            </View> */}
          </View>
        </View>
        {currentuser?.uid && (
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
                    onPress={() => HireUsers()}
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
                      Hire
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
        )}

        <Divider style={{ width: 1000 }} />
      </View>
      <PortfolioTab useruid={useruid} />
      <View style={{ top: 30, position: "absolute", right: 18 }}>
        <ThreeDots
          visibility={threedotvisible}
          height={100}
          width={200}
          data={[
            // {
            //   text: "Settings",
            //   icon: "settings-sharp",
            //   func: () => {},
            // },
            {
              text: "Logout",
              icon: "log-out-outline",
              func: () => handleLogout(),
            },
            {
              text: "Edit",
              icon: "pencil",
              func: () => navigation.navigate("Edit"),
            },
            {
              text: "Update",
              icon: "cloud-download-outline",
              func: () => UpdateApp(),
            },
          ]}
        />
      </View>
    </View>
  );
}
