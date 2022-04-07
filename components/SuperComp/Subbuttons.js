import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";
const { width } = Dimensions.get("screen");
let deviceWidth = Dimensions.get("screen").width;
let CIRCLESIZE = 50;
let CIRCLERADIUS = 100;
import { useTabBar } from "../../Hooks/TabBarprovider";
import { useNavigation } from "@react-navigation/native";
let deviceHeight = Dimensions.get("screen").height;
export default function PostButton() {
  const navigation = useNavigation();
  const { showTabBar } = useTabBar();
  const Homeicon = require("../assets/Icon/Homeadvisor.png");
  const Announceicon = require("../assets/Icon/Annnounce.png");
  const RotationAnim = useState(new Animated.Value(0))[0];
  const DiagnolAnim = useState(new Animated.Value(1))[0];
  const OpacityAnim = useState(new Animated.Value(0))[0];
  const [moved, setmoved] = useState(false);

  function onpress() {
    Animated.parallel([
      Animated.timing(RotationAnim, {
        toValue: 1,
        duration: 200,
      }),
      Animated.timing(OpacityAnim, {
        toValue: 1,
        duration: 250,
      }),
      Animated.timing(DiagnolAnim, {
        toValue: 100,
        duration: 200,
        easing: Easing.ease,
      }),
    ]).start();
  }

  function Reset() {
    Animated.parallel([
      Animated.timing(RotationAnim, {
        toValue: 0,
        duration: 200,
      }),
      Animated.timing(OpacityAnim, {
        toValue: 0,
        duration: 250,
      }),
      Animated.timing(DiagnolAnim, {
        toValue: 0,
        duration: 200,
      }),
    ]).start();
  }
  function handlepress() {
    if (!moved) {
      onpress();
      setmoved(true);
    } else {
      Reset();
      setmoved(false);
    }
  }
  useEffect(() => {
    Reset();
    setmoved(false);
  }, [showTabBar]);
  const rotate = RotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("HomeChat");
        }}
      >
        <Animated.View
          style={[
            styles.shape2,
            {
              bottom: DiagnolAnim,
              opacity: OpacityAnim,
              transform: [{ translateX: DiagnolAnim }],
            },
          ]}
        >
          <Image source={{ uri: Homeicon }} style={{ width: 25, height: 25 }} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.shape,
          { bottom: DiagnolAnim, opacity: OpacityAnim, right: DiagnolAnim },
        ]}
      >
        <TouchableOpacity>
          <Image
            source={{ uri: Announceicon }}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={[styles.button]} onPress={handlepress}>
        <Animated.View
          style={[
            styles.center,
            {
              transform: [
                {
                  rotate: rotate,
                },
              ],
            },
          ]}
        >
          <Feather name="plus" size={30} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    left: deviceWidth / 2 - 18,
    bottom: 20,
  },
  blurContainer: {
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: CIRCLERADIUS,
    elevation: 5,
    padding: 15,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  shape: {
    backgroundColor: Colors.primary,
    width: CIRCLESIZE,
    height: CIRCLESIZE,
    position: "absolute",
    borderRadius: CIRCLERADIUS,
    borderColor: Colors.grey,
    borderWidth: 1,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shape2: {
    backgroundColor: Colors.primary,
    width: CIRCLESIZE,
    height: CIRCLESIZE,
    borderRadius: CIRCLERADIUS,
    borderColor: Colors.grey,
    borderWidth: 1,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
