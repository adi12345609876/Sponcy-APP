import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Colors } from "../../Features/Colors";
export default function Time({ time }) {
  return (
    <View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: Colors.grey,
    fontWeight: "600",
  },
});
