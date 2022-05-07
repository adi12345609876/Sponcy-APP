import {
  SimpleLineIcons,
  Octicons,
  Feather,
  EvilIcons,
  Entypo,
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Linking,
  TouchableOpacity,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
  TouchableNativeFeedbackBase,
  TouchableHighlight,
} from "react-native";

import { Colors, SocilaColors } from "../../Features/Colors";
import { deviceWidth, StatusBar_Height, styles } from "../../Features/Styles";
import ImageViewer from "react-native-image-zoom-viewer";
import { Announces } from "../../BACKEND/Announce";
import ThreeDots from "./3dotComp";
import { useTabBar } from "../../Hooks/TabBarprovider";

export function SuperButton(props) {
  //props:onPress,loading,buttonstyle,imagestyle,textstyle
  return (
    <TouchableOpacity
      style={
        props.buttonstyle
          ? props.buttonstyle
          : {
              backgroundColor:
                props.loading || props.disabled ? Colors.grey : Colors.primary,
              height: 50,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }
      }
      onPress={props.onPress}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          {props.image && (
            <Image
              source={props.image ? props.image : null}
              style={
                props.imagestyle
                  ? props.imagestyle
                  : { height: 35, width: 35, marginRight: 5 }
              }
            />
          )}
          {props.text && (
            <Text
              style={
                props.textstyle
                  ? props.textstyle
                  : {
                      fontWeight: "bold",
                      fontSize: 20,
                      color: Colors.white,
                      textAlign: "center",
                    }
              }
            >
              {props.text}
            </Text>
          )}

          {props.children ? props.children : null}
        </>
      )}
    </TouchableOpacity>
  );
}
export function SuperContainerImage({ route, navigation }) {
  const [threedotvisible, setthreevisible] = React.useState();

  let array = [];
  const { photo } = route.params;
  const data = Announces();
  data?.map((m) => {
    if (m?.PhotoURL) array = m?.PhotoURL;
    console.log("array", array);
  });

  const images = [
    {
      url: photo,
    },
    {
      url: array,
    },
  ];
  function DownloadImage(url) {
    Linking.openURL(url);
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#F5FCFF",
            flex: 1,
          }}
        >
          <StatusBar
            animated={true}
            backgroundColor={"black"}
            barStyle={"light-content"}
          />
          <View
            style={{
              flexDirection: "row",

              backgroundColor: "black",

              width: deviceWidth,
              // marginTop: StatusBar_Height,
            }}
          >
            <TouchableOpacity
              style={[[styles.Searchbox, { marginLeft: 20 }]]}
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
                {
                  marginLeft: deviceWidth - 80,
                },
              ]}
              onPress={() => setthreevisible(!threedotvisible)}
            >
              <Entypo
                name="dots-three-vertical"
                size={24}
                color={Colors.black}
              />
            </TouchableOpacity>
          </View>
          <ImageViewer imageUrls={images} renderIndicator={() => null} />
        </View>
        <View style={{ top: 30, position: "absolute", right: 18 }}>
          <ThreeDots
            setvisibility={setthreevisible}
            visibility={threedotvisible}
            height={100}
            width={200}
            data={[
              {
                text: "Download with browser",
                icon: "Cloud_Download",
                func: () => DownloadImage(photo),
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

export default class SocialIcon extends React.Component {
  render() {
    const { name, color, onPress, aroundstyles, ...props } = this.props;

    return (
      <TouchableOpacity onPress={() => onPress()} style={aroundstyles}>
        <FontAwesome
          {...props}
          color={color || SocilaColors[name]}
          name={name}
        />
      </TouchableOpacity>
    );
  }
}
export const SuperFAB = ({ Subbuttons }, props) => {
  //props:speedspin,backgroundcolor,position

  const [isOpen, setIsOpen] = React.useState(false);
  const { showTabBar } = useTabBar();
  const toggleAnimation = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(toggleAnimation, {
      toValue: toValue,
      duration: props.speedspin ? props.speedspin : 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };
  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  React.useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);
  return (
    <>
      <Animated.View
        style={[
          props.position
            ? props.position
            : {
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                bottom: 70,
                right: 20,
                transform: [{ translateY: animation }],
              },
        ]}
      >
        {isOpen && (
          <>
            <TouchableHighlight
              style={{ flex: 1, position: "absolute", opacity: 0.5 }}
              onPress={() => startAnimation()}
            >
              <View
                style={{
                  backgroundColor: Colors.grey,
                  height: 1000,
                  width: 1000,
                }}
              ></View>
            </TouchableHighlight>

            <View>
              {Subbuttons?.map((item) => (
                <View>
                  <TouchableOpacity onPress={item.onPress}>
                    <Animated.View
                      style={{
                        transform: [
                          {
                            translateY: toggleAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                40 * item.number + 10 * item.number,
                                -10 * item.number,
                              ],
                            }),
                          },
                        ],
                        backgroundColor: item.bgc ? item.bgc : Colors.white,
                        width: item.size ? item.size : 40,
                        height: item.size ? item.size : 40,
                        borderRadius: 150,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                      }}
                    >
                      <Animated.View
                        style={{
                          position: "absolute",
                          right: item.size ? item.size + 10 : 50,

                          borderRadius: 10,
                          marginTop: 10,
                          // flexDirection: "row",
                          alignSelf: "flex-start",
                          backgroundColor: "#ecf0f1",
                          padding: 8,
                          width: 150,
                          height: "100%",
                          opacity: toggleAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                          }),
                        }}
                      >
                        <Text
                          style={[
                            styles.Smalltext,
                            {
                              color: item.textcolor
                                ? item.textcolor
                                : Colors.black,
                            },
                          ]}
                        >
                          {item.text ? item.text : "text"}
                        </Text>
                      </Animated.View>

                      <Image
                        source={item.icon}
                        style={{
                          color: item.color ? item.color : Colors.white,
                          width: 25,
                          height: 25,
                        }}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
        <TouchableWithoutFeedback
          onPress={() => {
            startAnimation();
          }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  rotate: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "135deg"],
                  }),
                },
              ],
              backgroundColor: props.backgroundcolor
                ? props.backgroundcolor
                : Colors.primary,
              width: 60,
              borderRadius: 30,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              elevation: 20,
              shadowColor: Colors.black,
              zIndex: 2,
            }}
          >
            <Ionicons
              styles={{ marginRight: 100 }}
              name={props.icon ? props.icon : "add"}
              size={50}
              color={props.color ? props.color : Colors.white}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  );
};
export function SuperIcons({ name, size, color }) {
  //iconsname = Comment,Share,Logout,Pencil-Edit,Settings,Edit,Dashboard,Camera,Gallery,at,Cloud_Download,password,Back-Arrow,
  const icon =
    (name == "Comment" &&
      require("../../assets/Icon/IconPack/Comment_Lines.png")) ||
    (name == "Share" && require("../../assets/Icon/IconPack/Share.png")) ||
    (name == "Logout" && require("../../assets/Icon/IconPack/Logout.png")) ||
    (name == "Pencil-Edit" &&
      require("../../assets/Icon/IconPack/Pencil_Edit.png")) ||
    (name == "Settings" &&
      require("../../assets/Icon/IconPack/Settings.png")) ||
    (name == "Edit" && require("../../assets/Icon/IconPack/Edit.png")) ||
    (name == "Invite" && require("../../assets/Icon/IconPack/Invite.png")) ||
    (name == "Forward" && require("../../assets/Icon/IconPack/Forward.png")) ||
    (name == "Trash" && require("../../assets/Icon/IconPack/Trash.png")) ||
    (name == "Close" && require("../../assets/Icon/IconPack/Close.png")) ||
    (name == "Dashboard" &&
      require("../../assets/Icon/IconPack/Dashboard.png")) ||
    (name == "Camera" && require("../../assets/Icon/IconPack/Camera.png")) ||
    (name == "Attach" && require("../../assets/Icon/IconPack/Attach.png")) ||
    (name == "ThreeDots-Fill" &&
      require("../../assets/Icon/IconPack/ThreeDots-Fill.png")) ||
    (name == "ThreeDots" &&
      require("../../assets/Icon/IconPack/ThreeDots.png")) ||
    (name == "Gallery" && require("../../assets/Icon/IconPack/Gallery.png")) ||
    (name == "at" && require("../../assets/Icon/IconPack/at.png")) ||
    (name == "Cloud_Download" &&
      require("../../assets/Icon/IconPack/Cloud_Download.png")) ||
    (name == "lock" && require("../../assets/Icon/IconPack/lock.png")) ||
    (name == "Back-Arrow" &&
      require("../../assets/Icon/IconPack/Back-Arrow.png"));
  return (
    <Image
      source={icon}
      style={{
        height: size,
        width: size,
        aspectRatio: 1,
        tintColor: color ? color : Colors.black,
      }}
    />
  );
}
