import React, {  } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AnnounceScreen from '../Screens/AnnounceScreen';
const Tab = createMaterialTopTabNavigator();

export default function Header() {
  return (
  
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={AnnounceScreen} />
        </Tab.Navigator>
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 90,
    justifyContent: 'space-between',
  },
});
