import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../../Features/Features";
const { width } = Dimensions.get("screen");
let deviceWidth = Dimensions.get("screen").width;
let CIRCLERADIUS = 250;
import { useTabBar } from "../../Hooks/TabBarprovider";
import { useNavigation } from "@react-navigation/native";
export default function PostButton() {
  const navigation = useNavigation();
  const { showTabBar } = useTabBar();

  function handlepress() {
    navigation.navigate("Post");
  }
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={[styles.button]} onPress={handlepress}>
        <View style={[styles.center, {}]}>
          <Feather name="plus" size={30} color="white" />
        </View>
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

  button: {
    backgroundColor: Colors.primary,
    width: 60,
    height: 60,
    borderRadius: CIRCLERADIUS,
    elevation: 5,
    padding: 15,
    borderColor: Colors.white,
    borderWidth: 1,
  },
});
