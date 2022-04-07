import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { styles } from "../../Features/Styles";

const NameText = ({ name }) => <Text style={styles.itemText}>{name}</Text>;

export default NameText;
