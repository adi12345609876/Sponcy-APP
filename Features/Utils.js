import { Platform, ToastAndroid, Alert, Share, Linking } from "react-native";
import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";
import { Glogin } from "../BACKEND/Auth";

import icon from "../assets/Notificationicon.png";
import { LeaveRoom } from "../BACKEND/firebase";

//GET TOKEN
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
      // Notifications.setNotificationChannelAsync("default", {
      //   name: "default",

      // });
      await Notifications.setNotificationChannelAsync("new-Hire", {
        name: "Hire notifications",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
}
//SEND NOTIFICATION
export async function sendNotification(expoPushToken, Title, Body, Data) {
  const message = {
    to: expoPushToken,
    title: Title,
    body: Body,
    data: Data,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    // trigger: {
    //   seconds: 2,
    //   channelId: "new-Hire",
    // },
    // content: {
    //   title: "Message",
    //    icon: "../assets/Notificationicon.png",
    //   sound: "Notify.wav", // Provide ONLY the base filename
    // },
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function GoogleLogin() {
  await Glogin();
}
// export async function GithubLogin() {
//   await Gitlogin();
// }
export async function PickImage(setPhoto, setPhotoURL) {
  // No permissions request is necessary for launching the image library

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.uri, true);
      xhr.send(null);
    });
    console.log("result.uri", result.uri);
    setPhoto(blob);
    setPhotoURL(result.uri);
    console.log(result.uri);
  }
}
export async function TakeCameraPhoto(setPhoto, setPhotoURL) {
  let result = await ImagePicker.launchCameraAsync();
  if (!result.cancelled) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.uri, true);
      xhr.send(null);
    });
    console.log("result.uri", result.uri);
    setPhoto(blob);
    setPhotoURL(result.uri);
    console.log(result.uri);
  }
}
export async function PostImage(setPhoto, PhotoURL, setPhotoURL) {
  if (PhotoURL) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", PhotoURL, true);
      xhr.send(null);
    });
    // console.log("blob", blob);
    setPhoto(blob);
    setPhotoURL(PhotoURL);
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
        "I recommend Sponcy || Sponcy is an App that helps youn to show your Skill to the World, Applink:https://play.google.com/store/apps/details?id=com.adinathr.Sponcy ",
      url: "https://play.google.com/store/apps/details?id=com.adinathr.Sponcy",
    });
  } catch (error) {
    alert(error.message);
  }
}
export async function GoToInstagram() {
  const instagramURL = "https://www.instagram.com/perfectsmooth22/";
  return Linking.openURL(instagramURL);
}

export async function GoToYoutube() {
  const instagramURL = `https://www.youtube.com/channel/UCEdm7bUe-C0k2kFyA4r81UA`;
  return Linking.openURL(instagramURL);
}
export async function GotoTwitter() {
  const instagramURL = `https://twitter.com/PerfectSmooth`;
  return Linking.openURL(instagramURL);
}
export async function ShowAlert(Title, Message, positivefunc) {
  Alert.alert(Title, Message, [
    positivefunc ? { text: "Sure", onPress: () => positivefunc() } : null,
    { text: "Cancel", onPress: () => console.log("Cancel") },
  ]);
}
export async function sendEmail(to, subject, body, options = {}) {
  const { cc, bcc } = options;

  let url = `mailto:${to}`;

  // Create email link query
  const query = JSON.stringify({
    subject: subject,
    body: body,
    cc: cc,
    bcc: bcc,
  });

  if (query.length) {
    url += `?${query}`;
  }

  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error("Provided URL can not be handled");
  }

  return Linking.openURL(url);
}
export function Feedbacksender() {
  sendEmail("perfectsmooth22@gmail.com");
}
