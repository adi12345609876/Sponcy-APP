import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Card } from "react-native-paper";
import { Colors } from "../../Features/Features";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function AssetExample({ visibility, height, width, data }) {
  const [selectedId, setSelectedId] = useState(null);
  const [pressfunc, setpressfunc] = useState();

  const RenderSeparator = () => (
    <View style={{ marginVertical: 3 }}>
      <Divider style={{ width: 1000 }} />
    </View>
  );

  return (
    <>
      {visibility && (
        <Card style={[styles.Card, { height: height, width: width }]}>
          <View style={styles.container}>
            {data.map((item) => (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    zIndex: 2,
                  }}
                  onPress={item.func}
                >
                  <Ionicons name={item.icon} size={24} color="black" />
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

const styles = StyleSheet.create({
  Card: {
    backgroundColor: Colors.tertiary,
    alignSelf: "flex-start",
    zIndex: 1,
    // position: "absolute",
  },
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 2,
    // position: "absolute",
    // left: 0,
    // bottom: 0,
  },
});
