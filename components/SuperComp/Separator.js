import { Divider } from 'react-native-elements';
import React from 'react';
import {
  View,
} from 'react-native';
const renderSeparator = () => (
  <View style={{marginVertical:3}}>
    <Divider style={{ width: 1000 }} />
  </View>
);
export default renderSeparator;
