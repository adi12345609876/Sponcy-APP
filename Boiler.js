// import React, { useState, useEffect, useRef } from "react";
// import { View } from "react-native";
// import * as Notifications from "expo-notifications";
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
// export default function Notifyexample() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification) => {
//         setNotification(notification);
//       });

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response);
//       });

//     return () => {
//       Notifications.removeNotificationSubscription(
//         notificationListener.current
//       );
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   return <View></View>;
// }
// //Notification Data
// // async function schedulePushNotification() {
// //   await Notifications.scheduleNotificationAsync({
// //     content: {
// //       title: "You've got mail! 📬",
// //       body: "Here is the notification body",
// //       data: { data: "goes here" },
// //     },
// //     trigger: { seconds: 2 },
// //   });
// // }
// //token
// // async function registerForPushNotificationsAsync() {
// //   let token;
// //   if (Constants.isDevice) {
// //     const { status: existingStatus } =
// //       await Notifications.getPermissionsAsync();
// //     let finalStatus = existingStatus;
// //     if (existingStatus !== "granted") {
// //       const { status } = await Notifications.requestPermissionsAsync();
// //       finalStatus = status;
// //     }
// //     if (finalStatus !== "granted") {
// //       alert("Failed to get push token for push notification!");
// //       return;
// //     }
// //     token = (await Notifications.getExpoPushTokenAsync()).data;
// //     console.log(token);
// //   } else {
// //     alert("Must use physical device for Push Notifications");
// //   }

// //   if (Platform.OS === "android") {
// //     Notifications.setNotificationChannelAsync("default", {
// //       name: "default",
// //       importance: Notifications.AndroidImportance.MAX,
// //       vibrationPattern: [0, 250, 250, 250],
// //       lightColor: "#FF231F7C",
// //     });
// //   }

// //   return token;
// // }
