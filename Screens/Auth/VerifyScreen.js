import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  RefreshControl,
} from "react-native";
import { useauth } from "../../BACKEND/Auth";
import { styles } from "../../Features/Styles";

import { useLoading } from "../../Hooks/LoadingContext";
// import { Colors } from "./Features/Features";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function AssetExample({ route }) {
  const navigation = useNavigation();
  const currentuser = useauth();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (currentuser?.emailVerified) {
      navigation.navigate("UserDetails");
    }
  }, [currentuser]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      >
        <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
          {currentuser?.email}
        </Text>
        <Text style={{ fontSize: 23, fontweight: "bold", color: "red" }}>
          go and verify your email and Click on the refresh buton after verifing
        </Text>

        <Button title="refresh" onPress={() => onRefresh()} />
      </ScrollView>
    </SafeAreaView>
  );
}
