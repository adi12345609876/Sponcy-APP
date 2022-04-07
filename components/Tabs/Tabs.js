import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

//{icon && <AntDesign name={icon} size={24} color={color} />}
const Tabs = ({ color, tab, onPress, icon }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {icon && <Image source={icon} style={{ width: 25, height: 25 }} />}
        <Text style={{ color }}>{tab.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    paddingHorizontal: 12,
  },
});

export default Tabs;
