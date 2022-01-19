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
import { signup, login, logout, useauth } from "../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
export default function Signin() {
  const navigation = useNavigation();
  const emailref = useRef();
  const passwordref = useRef();
  const currentuser = useauth()
  async function handleSignin() {
    try {
      await signup(emailref.current.value, passwordref.current.value);
    } catch (e) {
      alert(e);
    }
  }
  async function handleLogin() {
    try {
      await login(emailref.current.value, passwordref.current.value);
      console.log("sucessfully logged in")
    } catch (e) {
      alert(e);
    }
  }
 
  
  return (
    <View style={{ marginVertical: 10 }}>
      <LinearGradient
        style={styles.circlestyle1}
        colors={["#FF8A00", "#FAFF00"]}
      />
      <LinearGradient
        style={styles.circlestyle2}
        colors={["#FF8A00", "#FAFF00"]}
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
        <Text style={styles.or}>or</Text>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity style={styles.signinbutton}>
            <Text style={[styles.signinbuttonText, { color: "#FFFFFF" }]}>
              Sign In with Google
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity style={styles.signinbutton}>
            <Text style={[styles.signinbuttonText, { color: "#000000" }]}>
              Sign In with Github
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.createbutton} onPress={handleSignin}>
            <Text style={[styles.createbuttontext, { color: "#FC8800" }]}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.alreadyhave}>Already have an account? login</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    color: "#858585",
  },
  signinbutton: {
    width: deviceWidth,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#FC8800",
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
    backgroundColor: "#000000",
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
