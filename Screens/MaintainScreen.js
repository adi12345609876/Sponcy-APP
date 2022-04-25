import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        This Screen is under Maintain For a Better Update, Tell Us FeedBack at
      </Text>
      <Text style={styles.paragraph2}>perfectsmooth22@gmail.com</Text>
      <Text style={[styles.paragraph, { fontSize: 10 }]}>from</Text>
      <Image style={styles.logo} source={require("../assets/Sponcy.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph2: {
    margin: 24,
    marginTop: 0,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
  },
  logo: {
    height: 128,
    width: "100%",
  },
});
