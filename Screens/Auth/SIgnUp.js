import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;
import { LinearGradient } from 'expo-linear-gradient';
import { signup, login, logout, useauth } from "../../BACKEND/firebase";
import { useNavigation } from "@react-navigation/native";
export default function Signin() {
  const navigation = useNavigation();
  const emailref = useRef();
  const passwordref = useRef();
  async function handleSignin() {
    try {
      await signup(emailref.current.value, passwordref.current.value);
    } catch (e) {
      alert(e);
    }
  }
  return (
    <View>
      <LinearGradient
        style={styles.circlestyle1}
        colors={['#1400FF', '#FF00E5']}
      />
      <LinearGradient
        style={styles.circlestyle2}
        colors={['#1400FF', '#FF00E5']}

      />
      <View style={{ position: 'absolute' }}>
        <Text style={styles.signINStyle}>Sign Up</Text>
        <View>
          <Text style={styles.emailtext}>Email</Text>
          <TextInput style={styles.emailInput} placeholder="name@gmail.com" />
        </View>
        <View>
          <Text style={styles.emailtext}>Password</Text>
          <TextInput style={styles.emailInput} placeholder="password" />
        </View>
        <Text style={styles.or}>or</Text>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity style={styles.signinbutton}>
            <Text style={[styles.signinbuttonText, { color: '#FFFFFF' }]}>
              Sign In with Google
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 10 }}>
          <TouchableOpacity style={styles.signinbutton}>
            <Text style={[styles.signinbuttonText, { color: '#000000' }]}>
              Sign In with Github
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.createbutton}>
            <Text style={[styles.createbuttontext, { color: '#FC8800' }]}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.alreadyhave}>Create new Account? Sign Up</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circlestyle1: {
    width: 395,
    height: 359,
    backgroundColor: '#3262FF',
    borderRadius: 600,
    right: 150,
    bottom: 120,
    opacity:1,
    
  },
  circlestyle2: {
    width: 395,
    height: 359,
    backgroundColor: '#3262FF',
    borderRadius: 600,
    left: 200,
    top: 0,
    opacity:1,

  },
  signINStyle: {
    //done
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: deviceWidth / 5,
    fontWeight: '700',
    fontStyle: 'normal',
    padding: 5,
  },
  emailtext: {
    //done
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    color: 'black',
    padding: 5,
  },

  emailInput: {
    borderRadius: 28,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 3,
    marginRight: 3,
    width: '100%',
    justifyContent: 'center',
    padding: 15,
  },

  or: {
    //done
    textAlign: 'center',
    fontFamily: 'Roboto',
    color: '#858585',
  },
  signinbutton: {
    width: deviceWidth,
    height: 50,
    borderRadius: 17,
    backgroundColor: '#FC8800',
  },
  signinbuttonText: {
    // width: 275,
    // height: 46,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 5,
  },
  createbutton: {
    width: 150,
    height: 70,
    borderRadius: 23,
    backgroundColor: '#000000',
  },
  createbuttontext: {
    fontFamily: 'Roboto',
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    //textAlignVertical:"center"
    padding: 10,
  },
  alreadyhave: {
    fontFamily: 'Roboto',
    fontSize: 15,
    padding: 10,
    color:"blue",
    fontWeight:"bold"
  },
});
