import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
let deviceWidth = Dimensions.get("screen").width;
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "../../Features/Colors";
import { GithubLogin, showtoast } from "../../Features/Utils";
import { login, ChangeEmail } from "../../BACKEND/Auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { styles } from "../../Features/Styles";
import { SuperButton } from "../../components/SuperComp/SuperComp";
import { Card } from "react-native-paper";

export default function Signin({ route }) {
  // const { reauthenticate } = route.params;
  const navigation = useNavigation();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  // const [UserName, setUserName] = useState();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  async function handleLogin() {
    if (password.length > 9) {
      try {
        setloading(true);
        await login(email, password).then(ChangeEmail(currentuser, newEmail));

        setloading(false);
        navigation.navigate("MyDrawer", {
          initialRoute: "Settings",
        });
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
          colors={["#FF5F6D", "#FFC371"]}
        />
        <LinearGradient
          style={styles.circlestyle2}
          colors={["#FF5F6D", "#FFC371"]}
        />
        <View style={{ position: "absolute" }}>
          <TouchableOpacity
            style={{
              marginLeft: 15,
              borderRadius: 10,
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>

          <Text style={styles.signINStyle}>Log In</Text>

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
            {/* <SuperButton
              text={"Sign In"}
              onPress={() => handleSignin()}
              loading={loading}
              textstyle={[styles.createbuttontext, { color: Colors.primary }]}
              buttonstyle={styles.createbutton}
            /> */}
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
