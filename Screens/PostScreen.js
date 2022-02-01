import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import button from "../assets/Icon/EmailSend.png";
import { Colors } from "../Features/Features";

export default function App({ navigation }) {
  const [text, settext] = useState();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Ionicons name="arrow-back-outline" size={30} color={Colors.Black} />
        </View>
        <View style={{ position: "absolute", right: 10 }}>
          <TouchableOpacity style={styles.submitbutton}>
            <Image
              source={button}
              style={{ height: 35, width: 35, marginRight: 5 }}
            />

            <Text
              style={{
                marginRight: 14,
                marginBottom: 10,
                fontWeight: "bold",
                color: "Colors.white",
              }}
            >
              Announce
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: 15, borderRadius: 10, marginTop: 40 }}>
        <TextInput
          placeholder="Type your thoughts"
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={settext}
          autoComplete
          textAlign="left"
          value={text}
          multiline
          maxLength={250}
        />
      </View>
      <TouchableOpacity style={{ margin: 20 }}>
        <View
          style={{
            width: 300,
            height: 200,
            backgroundColor: Colors.primary,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="camera-plus"
            size={50}
            color="Colors.whitedfa"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 15,
  },
  submitbutton: {
    backgroundColor: Colors.primary,
    width: 140,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  input: {
    maxHeight: 200,
    height: 200,
    textAlignVertical: "top",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
});
