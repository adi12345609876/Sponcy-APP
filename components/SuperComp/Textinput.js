import React, { useState } from "react";

import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { PickImage } from "../../Features/Utils";

export default function SuperTextInput(props) {
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      // type: "application/pdf",
    });

    if (result != null) {
      const doc = await fetch(result.uri);
      const bytes = await doc.blob();
      props.setPhoto(bytes);
      props.setPhotoDetails(result);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={[styles.sectionStyle, { height: Math.max(35, props.height) }]}
      >
        <TextInput
          style={[
            styles.textInputStyle,
            { height: Math.max(35, props.height) },
          ]}
          placeholder="Type Thoughts"
          underlineColorAndroid="transparent"
          multiline
          onContentSizeChange={(event) => {
            props.setheight(event.nativeEvent.contentSize.height);
          }}
          onChangeText={props.settext}
          textAlign="left"
          // onSubmitEditing={(e) => onSubmit(e.nativeEvent.texts)}
          value={props.text}
          clearButtonMode="always"
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginLeft: 12 }} onPress={pickDocument}>
            <Entypo name="circle" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => PickImage(props.setPhoto, props.setPhotoURL)}
          >
            <Ionicons name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {props.children}
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
    fontWeight: "400",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.tertiary,
    width: "100%",
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
