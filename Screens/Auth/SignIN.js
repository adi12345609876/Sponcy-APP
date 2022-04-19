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
  showtoast,
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
import { SuperButton } from "../../components/SuperComp/SuperComp";
import { Card } from "react-native-paper";
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
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  useEffect(() => {
    //setToken
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, [expoPushToken]);
  async function handleSignin() {
    if (password.length > 9) {
      try {
        setloading(true);
        await signup(email, password).then((user) => {
          setToken(expoPushToken, user?.user?.uid).then(
            navigation.navigate("UserDetails")
          );
        });
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
        showtoast(error);
        console.log(error);
      }
    } else {
      showtoast("Password must have 10 letters");
    }
  }
  async function handleLogin() {
    if (password.length > 9) {
      try {
        setloading(true);
        await login(email, password);
        setloading(false);
      } catch (e) {
        seterror(true);
        setloading(false);
        console.log(e);
      }
    } else {
      showtoast("Password must have 10 letters");
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

          <View>
            {error && (
              <Card style={{ backgroundColor: "red" }}>
                <Text style={styles.paragraph}>Error Occured!</Text>
              </Card>
            )}
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

          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity style={styles.signinbutton} onPress={GithubLogin}>
              <Text style={[styles.signinbuttonText, { color: Colors.black }]}>
                Sign In with Github
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <SuperButton
              text={"Sign In"}
              onPress={() => handleSignin()}
              loading={loading}
              textstyle={[styles.createbuttontext, { color: Colors.primary }]}
              buttonstyle={styles.createbutton}
            />
            <SuperButton
              text={"Log In"}
              onPress={() => handleLogin()}
              loading={loading}
              textstyle={[styles.createbuttontext, { color: Colors.white }]}
              buttonstyle={[styles.createbutton, { color: Colors.primary }]}
            />

            {/* <TouchableOpacity
              style={styles.createbutton}
              onPress={handleSignin}
            >
              <Text
                style={[styles.createbuttontext, { color: Colors.primary }]}
              >
                Go
              </Text>
            </TouchableOpacity> */}
          </View>
          <View>
            {password?.length < 9 && (
              <Text style={[styles.Smalltext, { textAlign: "left" }]}>
                -Password Must have minimum 10 letters
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
