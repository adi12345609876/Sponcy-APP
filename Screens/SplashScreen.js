import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import { Colors } from "../Features/Features";

export default function SplashScreen() {
  const font = useFonts({
    Pacifico: require("../assets/Fonts/Pacifico-Regular.ttf"),
  });
  return (
    <View style={styles.container2}>
      <View style={styles.container}>
        <Text style={styles.logo}>Sponcy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primary,
    padding: 8,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    fontFamily: "Pacifico",
    fontSize: Constants.statusBarHeight * 2,
    color: Colors.white,
    fontStyle: "normal",
    fontWeight: "400",
    textAlign: "center",
    marginTop: 0,
  },
});
