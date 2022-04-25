import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useTabBar } from "../../Hooks/TabBarprovider";
import Tabs from "./Tabs";
import { Colors } from "../../Features/Colors";
const { width } = Dimensions.get("screen");
import PostButton from "./PostButton";
const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState("Announce");
  const { routes } = state;
  const renderColor = (currentTab) =>
    currentTab === selected ? Colors.primary : Colors.black;
  const renderIcon = (route) =>
    route.name === selected ? route.params.iconX : route.params.icon;

  const { showTabBar } = useTabBar();

  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY: animation }] }]}
      >
        {routes.map((route, index) => (
          <Tabs
            tab={route}
            icon={renderIcon(route)}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
        <PostButton />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 10,
    width,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    width: "100%",
    borderRadius: 10,
    elevation: 5,
    shadowColor: Colors.primary,
  },
});

export default TabBar;
