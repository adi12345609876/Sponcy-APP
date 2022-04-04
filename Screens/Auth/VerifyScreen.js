import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useauth } from "../../BACKEND/Auth";
// import { Colors } from "./Features/Features";

export default function AssetExample({ route }) {
  //   const { userdetails } = route.params;
  const currentuser = useauth();
  console.log(currentuser);
  const { setshowLoading, showLoading } = useLoading();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
        {currentuser ? currentuser?.emailVerified : setshowLoading(true)}
      </Text>
      <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
        {currentuser?.email}
      </Text>
      <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
        go and verify your email
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
