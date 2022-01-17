import React, {  } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useFonts } from 'expo-font';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Hooks
import TabBarprovider from './Hooks/TabBarprovider';
//components
import TabBar from './components/BottomTab';
import Header from './components/HeaderTab';
//screens
import SplashScreen from './Screens/SplashScreen';
import SignINScreen from './Screens/Auth/SignIN';
import SignUpScreen from './Screens/Auth/SIgnUp';
import HomeChatScreen from './Screens/HomeChatScreen';
import AnnounceScreen from './Screens/AnnounceScreen';
import NotifyScreen from './Screens/NotificationScreen';
import PeopleScreen from './Screens/peopleScreen';
import PortfolioScreen from './Screens/PortfolioScreen';
import ChatScreen from './Screens/ChatScreen';
import SearchScreen from './Screens/SearchScreen';
import CommentsScreen from './Screens/CommentsScreen';
import PostScreen from './Screens/PostScreen';
//icons
const Homeicon = require('./assets/Icon/Homeadvisor.png');
const Announceicon = require('./assets/Icon/Annnounce.png');
const Notifyicon = require('./assets/Icon/Notify.png');
const Peopleicon = require('./assets/Icon/Person.png');
//features
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Announce"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Tab.Screen
        name="Announce"
        component={AnnounceScreen}
        initialParams={{ icon: Announceicon }}
      />
      <Tab.Screen
        name="Home"
        component={HomeChatScreen}
        initialParams={{ icon: Homeicon }}
      />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        initialParams={{ icon: Notifyicon }}
      />
      <Tab.Screen
        name="People"
        component={PeopleScreen}
        initialParams={{ icon: Peopleicon }}
      />
    </Tab.Navigator>
  );
}
function MyStack() {
  return (
    <Stack.Navigator initialRouteName="">
      <Stack.Screen
        name="Tabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignINScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeChat"
        component={HomeChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Announce"
        component={AnnounceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notify"
        component={NotifyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="People"
        component={PeopleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <TabBarprovider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </TabBarprovider>
  );
}
