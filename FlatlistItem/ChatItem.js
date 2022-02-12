import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Time from "../components/time";
import { Colors } from "../Features/Features";
import { useauth } from "../BACKEND/firebase";
export default function ChatItem({ message, To, From, time }) {
  const currentuser = useauth();
  return (
    <View>
      <View style={From == currentuser?.uid ? styles.sending : styles.reciving}>
        <Text style={styles.text}>{message}</Text>
        <View style={{ position: "absolute", bottom: 0, right: 10 }}>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sending: {
    padding: 18,
    backgroundColor: Colors.white,
    alignSelf: "flex-end",
    borderBottomColor: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    borderTopRightRadius: 0,
    marginTop: 12,
  },
  reciving: {
    padding: 18,
    backgroundColor: Colors.tertiary,
    alignSelf: "flex-start",
    margin: 15,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  text: {
    // width: 160,
    // height: 20,
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    color: Colors.black,
    textAlign: "center",
  },
  time: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: Colors.grey,
    fontWeight: "600",
  },
});
