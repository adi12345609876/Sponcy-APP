import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Card } from "react-native-paper";
import { Colors } from "../../Features/Colors";
import { styles } from "../../Features/Styles";

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
          <View>
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
