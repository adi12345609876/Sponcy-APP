import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Time({time}) {
  return (
    <View>
      <Text style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 
   time: {
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#737373',
    fontWeight:"600",
  }
});
