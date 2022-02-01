import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTabBar } from '../Hooks/TabBarprovider';
import {Colors} from "../Features/Features"
let offsetY = 0;
const AnimatedScrollView = ({ children, ...restProps }) => {
  const { setShowTabBar } = useTabBar();
  return (
    <ScrollView
    style={{backgroundColor:Colors.white}}
      {...restProps}
      onScroll={({ nativeEvent }) => {
        const newOffset = nativeEvent.contentOffset.y;
        if (newOffset <= 0) return setShowTabBar(true);
        //if we the distance current distance is decresing than previsious then setshow = true
        offsetY < newOffset ? setShowTabBar(false) : setShowTabBar(true);
        offsetY = newOffset;
      }}>
      {children}
    </ScrollView>
  );
};

export default AnimatedScrollView;
