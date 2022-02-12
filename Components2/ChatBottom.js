//Image Icon in React Native TextInput
//https://aboutreact.com/image-icon-with-react-native-textinput/

//import React in our code
import React, { useState } from "react";

//import all the components we are going to use
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../Features/Features";
import { PostPrivateChats, useauth } from "../BACKEND/firebase";
export function ChatBottom({ roomid }) {
  const currentUser = useauth();
  const [height, setheight] = useState(23);
  const [text, settext] = useState();
  // const [senttext, setsenttext] = useState("hello");

  async function onSubmit() {
    console.log(roomid, currentUser?.uid, text);
    await PostPrivateChats(roomid, currentUser?.uid, text);
    setheight(23);
    settext("");
  }

  // <Text>{senttext}</Text>
  return (
    <View style={styles.container}>
      <View style={[styles.sectionStyle, { height: Math.max(35, height) }]}>
        <TextInput
          style={[styles.textInputStyle, { height: Math.max(35, height) }]}
          placeholder="Type Thoughts"
          underlineColorAndroid="transparent"
          multiline
          onContentSizeChange={(event) => {
            setheight(event.nativeEvent.contentSize.height);
          }}
          onChangeText={settext}
          autoComplete
          textAlign="left"
          // onSubmitEditing={(e) => onSubmit(e)}
          value={text}
          clearButtonMode="always"
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Entypo name="circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 20,
          bottom: 10,
          position: "absolute",
          right: 10,
          padding: 10,
        }}
      >
        <FontAwesome name="send-o" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    maxHeight: 100,
    width: "60%",
    borderRadius: 10,
    // alignSelf: 'center',
    // justifyContent: 'center',
    fontSize: 15,
    fontWeight: "450",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  sectionStyle: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    margin: 10,
    maxHeight: 100,
    alignSelf: "flex-start",
  },
});
