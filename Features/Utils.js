import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  ToastAndroid,
  Alert,
  Share,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";
import { Gitlogin, Glogin } from "../BACKEND/Auth";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS != "web") {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
}
export async function GoogleLogin() {
  await Glogin();
}
export async function GithubLogin() {
  await Gitlogin();
}
export async function PickImage(setPhoto, setPhotoURL) {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    //changing the file from long data to short readable https
    const img = await fetch(result.uri);
    const bytes = await img.blob();
    //then set it as the image

    setPhoto(bytes);
    setPhotoURL(result.uri);
  }
}
export function showtoast(msg) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
  }
}
export async function HandleShare() {
  try {
    await Share.share({
      title: "I recommend Sponcy",
      message:
        "I recommend Sponcy || Sponcy is an App that helps youn to show your Skill to the World, AppLink:https://radinath098.wixsite.com/sponcy ",
      url: "https://radinath098.wixsite.com/sponcy",
    });
  } catch (error) {
    alert(error.message);
  }
}
export async function handleToInstagram() {
  const instagramURL = "https://www.instagram.com/perfectsmooth22/";
  return Linking.openURL(instagramURL);
}

export async function handleToYoutube() {
  const instagramURL = `https://www.youtube.com/channel/UCEdm7bUe-C0k2kFyA4r81UA`;
  return Linking.openURL(instagramURL);
}
export async function handletoTwitter() {
  const instagramURL = `https://twitter.com/PerfectSmooth`;
  return Linking.openURL(instagramURL);
}
export async function ShowAlert(Title, Message, positivefunc) {
  Alert.alert(Title, Message, [
    positivefunc ? { text: "Sure", onPress: () => positivefunc } : null,
    { text: "Cancel", onPress: () => console.log("Cancel") },
  ]);
}
