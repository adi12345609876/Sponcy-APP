import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Colors } from "../../Features/Features";

const NameText = ({ name }) => <Text style={styles.itemText}>{name}</Text>;

const styles = StyleSheet.create({
  itemText: {
    flexWrap: "wrap",
    fontSize: 20,
    paddingRight: 5,
    fontWeight: "700",
    color: Colors.black,
    flexShrink: 1,
  },
});
export default NameText;
