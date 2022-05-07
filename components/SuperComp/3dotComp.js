import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Card } from "react-native-paper";
import { Colors } from "../../Features/Colors";
import { deviceWidth, styles } from "../../Features/Styles";
import Constants from "expo-constants";
import { SuperIcons } from "./SuperComp";

export default function AssetExample({
  setvisibility,
  visibility,
  height,
  width,
  data,
}) {
  const RenderSeparator = () => (
    <View style={{ marginVertical: 3 }}>
      <Divider style={{ width: deviceWidth / 2 }} />
    </View>
  );

  return (
    <>
      {visibility && (
        <Card
          style={[
            styles.Card,
            {
              height: height + 30,
              width: width,
              marginTop: Constants.statusBarHeight,
            },
          ]}
        >
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                zIndex: 2,
              }}
              onPress={() => setvisibility(false)}
            >
              <SuperIcons name={"Close"} size={30} color={Colors.black} />
              <View style={{ marginLeft: 10 }}>
                <Text>Close</Text>
              </View>
            </TouchableOpacity>
            <RenderSeparator />
            {data.map((item) => (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    zIndex: 2,
                  }}
                  onPress={item.func}
                >
                  <SuperIcons name={item.icon} size={30} color={Colors.black} />
                  <View style={{ marginLeft: 10 }}>
                    <Text>{item.text}</Text>
                  </View>
                </TouchableOpacity>
                <RenderSeparator />
              </>
            ))}
          </View>
        </Card>
      )}
    </>
  );
}
