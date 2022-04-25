import React from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";
import { useTabBar } from "../../Hooks/TabBarprovider";
import { Colors } from "../../Features/Colors";

let offsetY = 0;
const AnimatedFlatList = (
  { TopofList, BottomofList, ...restProps },
  renderItem
) => {
  const { setShowTabBar } = useTabBar();

  return (
    <>
      <FlatList
        ListHeaderComponent={TopofList ? TopofList() : null}
        ListFooterComponent={BottomofList ? BottomofList() : null}
        renderItem={renderItem}
        style={{ backgroundColor: Colors.white }}
        {...restProps}
        onScroll={({ nativeEvent }) => {
          const newOffset = nativeEvent.contentOffset.y;
          if (newOffset <= 0) return setShowTabBar(true);
          //if we the distance current distance is decresing than previsious then setshow = true
          offsetY < newOffset ? setShowTabBar(false) : setShowTabBar(true);
          offsetY = newOffset;
        }}
      />
    </>
  );
};

export default AnimatedFlatList;
