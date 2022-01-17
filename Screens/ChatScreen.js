import * as React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../Features/Features';
import ChatHeader from '../Components2/ChatHeader';
import { ChatBottom } from '../Components2/ChatBottom';
import ChatCenter from '../Components2/ChatCenter';

export default function AssetExample() {
  return (
    <View
      style={{
        backgroundColor: Colors.bluewhite,
        height: '100%',
        width: '100%',

      }}>
      <ChatHeader />
      <ChatCenter />
      <SafeAreaView style={styles.bottomcontainer}>
        <ChatBottom />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
