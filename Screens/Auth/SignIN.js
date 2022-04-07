import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
let deviceWidth = Dimensions.get("screen").width;
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";

import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Features/Colors";
import {
  registerForPushNotificationsAsync,
  GithubLogin,
  GoogleLogin,
} from "../../Features/Utils";
import {
  useauth,
  login,
  signup,
  Glogin,
  Gitlogin,
  setToken,
} from "../../BACKEND/Auth";
import { sendEmailVerification } from "firebase/auth";
import { useLoading } from "../../Hooks/LoadingContext";
import { styles } from "../../Features/Styles";
if (Platform.OS != "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

export default function Signin() {
  const navigation = useNavigation();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  // const [UserName, setUserName] = useState();
  const [expoPushToken, setExpoPushToken] = useState("");

  const currentuser = useauth();
  const { setshowLoading } = useLoading();
  useEffect(() => {
    //setToken
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, [expoPushToken]);
  async function handleSignin() {
    await signup(email, password).then((user) => {
      setshowLoading(true);
      setToken(expoPushToken, user?.user?.uid);
      setshowLoading(false);
      if (!user?.user?.emailVerified) {
        sendEmailVerification(user?.user);
        navigation.navigate("VerifyScreen");
      } else {
        navigation.navigate("UserDetails");
      }
    });
  }
  async function handleLogin() {
    try {
      setshowLoading(true);
      await login(email, password).then((user) => {
        setshowLoading(false);
        useEffect(() => {
          sendEmailVerification(user?.user);
          if (!user.user.emailVerified) {
            navigation.navigate("VerifyScreen");
          } else {
            navigation.navigate("UserDetails");
          }
        }, [user.user]);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <View style={{ marginVertical: 10 }}>
        <LinearGradient
          style={styles.circlestyle1}
          colors={[Colors.primary, Colors.secondary]}
        />
        <LinearGradient
          style={styles.circlestyle2}
          colors={[Colors.primary, Colors.secondary]}
        />
        <View style={{ position: "absolute" }}>
          <Text style={styles.signINStyle}>Sign In</Text>
          <Text>{currentuser?.email}</Text>
          <View>
            <Text style={styles.emailtext}>Email</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="name@gmail.com"
              onChangeText={setemail}
            />
          </View>
          <View>
            <Text style={styles.emailtext}>Password</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="password"
              onChangeText={setpassword}
            />
          </View>
          {/* <View>
            <Text style={styles.emailtext}>UserName</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="UserName"
              onChangeText={setUserName}
            />
          </View> */}
          <Text style={styles.or}>or</Text>
          {/* <View style={{ marginVertical: 10 }}>
            <TouchableOpacity style={styles.signinbutton} onPress={GoogleLogin}>
              <Text style={[styles.signinbuttonText, { color: Colors.white }]}>
                Sign In with Google
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity style={styles.signinbutton} onPress={GithubLogin}>
              <Text style={[styles.signinbuttonText, { color: Colors.black }]}>
                Sign In with Github
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.createbutton}
              onPress={handleSignin}
            >
              <Text
                style={[styles.createbuttontext, { color: Colors.primary }]}
              >
                Create
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            // disabled={email && passwordref}
          >
            <Text style={styles.alreadyhave}>
              Already have an account? login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
