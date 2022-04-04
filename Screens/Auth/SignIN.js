import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
import { LinearGradient } from "expo-linear-gradient";
import { setUser } from "../../BACKEND/firebase";

import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../Features/Features";
import {
  useauth,
  login,
  signup,
  Glogin,
  Gitlogin,
  SetUsername,
} from "../../BACKEND/Auth";
import { sendEmailVerification, verifyBeforeUpdateEmail } from "firebase/auth";
import { useLoading } from "../../Hooks/LoadingContext";
export default function Signin() {
  const navigation = useNavigation();
  const emailref = useRef();
  const passwordref = useRef();
  const UserNameref = useRef();
  const currentuser = useauth();
  const { setshowLoading, showLoading } = useLoading();

  async function handleSignin() {
    try {
      setshowLoading(true);
      await SetUsername(UserNameref?.current?.value);
      await signup(emailref?.current?.value, passwordref?.current?.value).then(
        (user) => {
          setshowLoading(false);
          if (!user.user.emailVerified) {
            sendEmailVerification(user?.user);
            navigation.navigate("VerifyScreen");
          } else {
            navigation.navigate("UserDetails");
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  async function handleLogin() {
    try {
      setshowLoading(true);
      await login(emailref?.current?.value, passwordref?.current?.value).then(
        (user) => {
          setshowLoading(false);
          useEffect(() => {
            if (!user.user.emailVerified) {
              sendEmailVerification(user?.user);
              navigation.navigate("VerifyScreen");
            } else {
              navigation.navigate("UserDetails");
            }
          }, [user.user]);
        }
      );
      console.log("sucessfully logged in");
    } catch (e) {
      console.log(e);
    }
  }
  async function GoogleLogin() {
    setshowLoading(true);

    await Glogin();
    setshowLoading(false);
  }
  async function GithubLogin() {
    setshowLoading(true);
    await Gitlogin();
    setshowLoading(false);
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
              ref={emailref}
            />
          </View>
          <View>
            <Text style={styles.emailtext}>Password</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="password"
              ref={passwordref}
            />
          </View>
          <View>
            <Text style={styles.emailtext}>UserName</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="UserName"
              ref={UserNameref}
            />
          </View>
          <Text style={styles.or}>or</Text>
          <View style={{ marginVertical: 10 }}>
            <TouchableOpacity style={styles.signinbutton} onPress={GoogleLogin}>
              <Text
                style={[styles.signinbuttonText, { color: "Colors.whiteFFF" }]}
              >
                Sign In with Google
              </Text>
            </TouchableOpacity>
          </View>
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
            // disabled={emailref && passwordref}
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

const styles = StyleSheet.create({
  circlestyle1: {
    width: 395,
    height: 359,
    borderRadius: 600,
    right: 150,
    bottom: 120,
  },
  circlestyle2: {
    width: 395,
    height: 359,
    borderRadius: 600,
    left: 200,
    top: 0,
  },
  signINStyle: {
    //done
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: deviceWidth / 5,
    fontWeight: "700",
    fontStyle: "normal",
    padding: 5,
  },
  emailtext: {
    //done
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    color: "black",
    padding: 5,
  },

  emailInput: {
    borderRadius: 28,
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 3,
    marginRight: 3,
    width: "100%",
    justifyContent: "center",
    padding: 15,
  },

  or: {
    //done
    textAlign: "center",
    fontFamily: "Roboto",
    color: Colors.grey,
  },
  signinbutton: {
    width: deviceWidth,
    height: 50,
    borderRadius: 17,
    backgroundColor: Colors.primary,
  },
  signinbuttonText: {
    // width: 275,
    // height: 46,
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 5,
  },
  createbutton: {
    width: 150,
    height: 70,
    borderRadius: 23,
    backgroundColor: Colors.black,
  },
  createbuttontext: {
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "center",
    //textAlignVertical:"center"
    padding: 10,
  },
  alreadyhave: {
    fontFamily: "Roboto",
    fontSize: 15,
    padding: 10,
  },
});
