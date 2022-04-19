import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { auth, useauth } from "../../BACKEND/Auth";
import { Colors } from "../../Features/Colors";
import { styles } from "../../Features/Styles";

import { useLoading } from "../../Hooks/LoadingContext";
// import { Colors } from "./Features/Features";

export default function AssetExample({ route }) {
  const navigation = useNavigation();

  // const [currentuser, setcurrentuser] = React.useState();
  const currentuser = useauth();

  useEffect(() => {
    if (currentuser?.emailVerified) {
      navigation.navigate("UserDetails");
    }
  }, [currentuser]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
        {currentuser?.email}
      </Text>
      <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
        go and verify your email and Click on the refresh buton after verifing
      </Text>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.createbutton}
          onPress={() => sendEmailVerification(currentuser)}
        >
          <Text style={[styles.createbuttontext, { color: Colors.primary }]}>
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
