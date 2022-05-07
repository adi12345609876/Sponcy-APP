import { Card, Title } from "react-native-paper";
import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Linking } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";
import { showtoast, ShowAlert } from "../../Features/Utils";
import { login, signup } from "../../BACKEND/Auth";
import { styles } from "../../Features/Styles";
import { SuperButton } from "../../components/SuperComp/SuperComp";
import Checkbox from "expo-checkbox";
import AnimatedLinearGradient, {
  presetColors,
} from "react-native-animated-linear-gradient";
export default function Signin() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  // const [UserName, setUserName] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [dontShowPassword, setdontShowPassword] = useState(true);
  const [accepted1, setaccepted1] = useState(false);
  const [accepted2, setaccepted2] = useState(false);

  async function handleSignin() {
    if (password.length > 9) {
      try {
        setloading(true);
        await signup(email, password);
        setloading(false);
      } catch (e) {
        setloading(false);
        seterror(true);
        ShowAlert("ERROR", e.message);
        console.log(e.message);
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
        ShowAlert("ERROR", `${e.message}`);

        console.log(e.message);
      }
    } else {
      showtoast("Password must have 10 letters");
    }
  }
  return (
    <>
      <AnimatedLinearGradient
        customColors={presetColors.Sponcy}
        speed={2000}
        points={10}
      >
        <Text style={styles.signINStyle}>Welcome To Sponcy</Text>
        <Card style={{ elevation: 10 }}>
          <Card.Content>
            <Title
              style={{
                margin: 24,
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Sign In
            </Title>
            <View>
              {error && (
                <Card style={{ backgroundColor: "red" }}>
                  <Text style={styles.paragraph}>Error Occured!</Text>
                </Card>
              )}
              <Text style={styles.emailtext}>Email</Text>
              <View
                style={{
                  flexDirection: "row",
                  borderColor: "#000",
                  paddingBottom: 10,
                }}
              >
                <TextInput
                  style={styles.emailInput}
                  placeholder="name@gmail.com"
                  onChangeText={setemail}
                  textContentType="emailAddress"
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.emailtext}>Password</Text>
                {dontShowPassword ? (
                  <TouchableOpacity onPress={() => setdontShowPassword(false)}>
                    <Entypo name="eye" size={24} color="grey" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setdontShowPassword(true)}>
                    <Entypo name="eye-with-line" size={24} color="grey" />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                style={styles.emailInput}
                placeholder="password"
                onChangeText={setpassword}
                textContentType="password"
                secureTextEntry={dontShowPassword}
              />
            </View>
            {password?.length < 9 && (
              <Text
                style={{
                  textAlign: "left",
                  color: "red",
                  fontSize: 10,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                *Password Must have minimum 10 letters
              </Text>
            )}
          </Card.Content>
          <Card.Actions>
            <View style={{ flexDirection: "column", marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  value={accepted1}
                  onValueChange={setaccepted1}
                  style={styles.checkbox}
                />

                <Text
                  style={{
                    marginLeft: 5,
                    color: accepted1 ? Colors.grey : Colors.black,
                  }}
                >
                  I agree to the
                </Text>
                <Text
                  onPress={() =>
                    Linking.openURL(
                      "https://www.privacypolicies.com/live/44a82f5f-b76b-40a4-9b1f-1c3480cc09fa"
                    )
                  }
                  style={{
                    color: Colors.link,
                    marginLeft: 5,
                    fontWeight: "bold",
                    opacity: accepted1 ? 0.5 : 1,
                  }}
                >
                  privacy policy
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  value={accepted2}
                  onValueChange={setaccepted2}
                  style={styles.checkbox}
                />
                <Text
                  onPress={() =>
                    Linking.openURL(
                      "https://www.privacypolicies.com/live/44a82f5f-b76b-40a4-9b1f-1c3480cc09fa"
                    )
                  }
                  style={{
                    marginLeft: 5,
                    color: accepted2 ? Colors.grey : Colors.black,
                  }}
                >
                  I will not misuse this app
                </Text>
              </View>

              {!accepted1 ||
                (!accepted2 && (
                  <Text
                    style={{
                      textAlign: "left",
                      color: "red",
                      fontSize: 10,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    *Must accept Policies to continue
                  </Text>
                ))}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {/* <SocialIcon
                  name="github"
                  size={48}
                  onPress={() => Gitlogin()}
                /> */}
              </View>
            </View>
          </Card.Actions>
        </Card>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginVertical: 10,
            // shadowOpacity: 10,
          }}
        >
          <SuperButton
            text={"Sign In"}
            onPress={() => handleSignin()}
            loading={loading}
            textstyle={[styles.createbuttontext, { color: Colors.white }]}
            buttonstyle={[
              styles.createbutton,
              {
                elevation: 20,
                backgroundColor:
                  !email || !password || !accepted1 || !accepted2
                    ? Colors.grey
                    : Colors.primary,
              },
            ]}
            disabled={
              !email ||
              !accepted1 ||
              !accepted2 ||
              !password ||
              !accepted2 ||
              !accepted1
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text style={{ color: Colors.grey }}>Already a User?</Text>

          <Text
            onPress={() => {
              email && password
                ? handleLogin()
                : ShowAlert(
                    "Fill the Form",
                    "first put you email and password then click on login "
                  );
            }}
            style={{
              opacity: 0.8,
              color: Colors.link,
              marginLeft: 5,
              fontWeight: "bold",
            }}
          >
            login
          </Text>
        </View>
      </AnimatedLinearGradient>
    </>
  );
}

//   <View
//     style={{
//       justifyContent: "center",
//       alignItems: "center",
//       flexDirection: "row",
//     }}
//   >
//     <SuperButton
//       text={"Sign In"}
//       onPress={() => handleSignin()}
//       loading={loading}
//       textstyle={[styles.createbuttontext, { color: Colors.primary }]}
//       buttonstyle={styles.createbutton}
//     />
//     <SuperButton
//       text={"Log In"}
//       onPress={() => handleLogin()}
//       loading={loading}
//       textstyle={[styles.createbuttontext, { color: Colors.white }]}
//       buttonstyle={[styles.createbutton, { color: Colors.primary }]}
//     />

//   </View>
// </View>
