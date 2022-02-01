import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Colors} from "../Features/Features"
const Notificationbutton = ({ number }) => (
  <View
    style={{
      backgroundColor:Colors.primary,
      width: 25,
      height: 25,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text
      style={{
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
      }}>
      {number}
    </Text>
  </View>
);

const styles = StyleSheet.create({

});
export default Notificationbutton;