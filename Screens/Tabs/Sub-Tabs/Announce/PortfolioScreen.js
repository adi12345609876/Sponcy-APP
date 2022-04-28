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
import {
  Hiredoc,
  sendNotifies,
  SpecifiedUserData,
} from "../../../../BACKEND/firebase";
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
import { UseState } from "../../../../Hooks/StateContext";
import { useLoading } from "../../../../Hooks/LoadingContext";
export default function App({ route }) {
  const navigation = useNavigation();
  const { useruid } = route.params;
  const specificuserdata = SpecifiedUserData(useruid);
  const userdetails = getUserDetailsCollection(useruid);
  const currentuser = useauth();
  const [threedotvisible, setthreevisible] = useState();
  const [alreadyfollwing, setalreadyfollwing] = useState();
  const [alreadyHiring, setalreadyHiring] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setalreadyfollwing(specificuserdata?.Followers?.includes(currentuser?.uid));
    setalreadyHiring(specificuserdata?.Hire?.includes(currentuser?.uid));
    console.log("alreadyfollwing", alreadyfollwing);
  }, [specificuserdata]);

  async function handleFollow() {
    setloading(true);
    await FollowUser(currentuser?.uid, specificuserdata?.uid);
    setloading(false);
    alreadyfollwing(true);
    showtoast("Following");
  }
  async function handleLogout() {
    showtoast("Loged out");
    logout();
    navigation.navigate("SignIn");
  }
  async function handleUnFollow() {
    setloading(true);
    await UnFollowUser(currentuser?.uid, specificuserdata?.uid);
    setloading(false);
    alreadyfollwing(false);
    showtoast("UnFollowed");
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
    await Hiredoc(currentuser?.uid, useruid);
    setalreadyHiring(true);
    await sendNotifies(
      useruid,
      `${currentuser?.displayName} is willing to hire`,
      currentuser?.uid,
      "Hire"
    );
    sendNotification(
      specificuserdata?.expoToken,
      `🚨Hire Offer🚨`,
      `${currentuser?.displayName} is willing to hire`
    );
    showtoast("Your request sent");
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
    <>
      <View
        style={{
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
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={Colors.black}
            />
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
                  backgroundColor: Colors.grey,
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
                {numFormatter(specificuserdata?.FollowerCount)}
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
                  Following
                </Text>
                <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
                  {numFormatter(specificuserdata?.FollowingCount)}
                </Text>
              </View>
            </View>
          </View>
          {currentuser?.uid && (
            <>
              <View style={{ marginTop: 15 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginLeft: 5 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          loading || alreadyfollwing
                            ? Colors.grey
                            : Colors.primary,
                        height: 40,
                        width: 150,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        elevation: 3,
                      }}
                      onPress={() =>
                        alreadyfollwing ? handleUnFollow() : handleFollow()
                      }
                      disabled={loading}
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
                        {alreadyfollwing ? "UnFollow" : "Follow"}
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
                      onPress={() =>
                        alreadyHiring
                          ? showtoast("Your request sent")
                          : HireUsers()
                      }
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
                        {alreadyHiring ? "Requesting..." : "Hire"}
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
      <PortfolioTab useruid={useruid} />
    </>
  );
}
