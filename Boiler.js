import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Colors} from "./Features/Features"

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text >
        Boiler Plate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
