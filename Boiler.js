import * as React from "react";
import { Text, View, StyleSheet, Image, TextInput, Button } from "react-native";
import {
  CreateOnetoOnechat,
  PostOnetoOnechat,
  SpecifiedUserData,
} from "./BACKEND/firebase";
import { Colors } from "./Features/Features";

export default function AssetExample({ route }) {
  const { currentUser, otheruser } = route.params;
  const specificuserdata = SpecifiedUserData(currentUser);
  const [text, settext] = React.useState();
  console.log(
    "%cStop!",
    "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
  );
  return (
    <View style={styles.container}>
      <Text>Boiler Plate</Text>
      <TextInput
        placeholder="Type Thoughts"
        underlineColorAndroid="transparent"
        multiline
        onChangeText={settext}
        autoComplete
        textAlign="left"
        value={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
