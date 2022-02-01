import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
//BACKEND
import { UserData } from "./BACKEND/firebase";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Hooks
import TabBarprovider from "./Hooks/TabBarprovider";
import { useauth } from "./BACKEND/firebase";
//components
import TabBar from "./components/BottomTab";
import Header from "./components/HeaderTab";
//screens
import SplashScreen from "./Screens/SplashScreen";
import SignINScreen from "./Screens/Auth/SignIN";
import SignUpScreen from "./Screens/Auth/SIgnUp";
import HomeChatScreen from "./Screens/HomeChatScreen";
import AnnounceScreen from "./Screens/AnnounceScreen";
import NotifyScreen from "./Screens/NotificationScreen";
import PeopleScreen from "./Screens/peopleScreen";
import PortfolioScreen from "./Screens/PortfolioScreen";
import ChatScreen from "./Screens/ChatScreen";
import SearchScreen from "./Screens/SearchScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import PostScreen from "./Screens/PostScreen";
import EditScreen from "./Screens/EditScreen";
import UserDetailsEditScreen from "./Screens/Auth/UserDetails";
//icons
const Homeicon = require("./assets/Icon/Homeadvisor.png");
const Announceicon = require("./assets/Icon/Annnounce.png");
const Notifyicon = require("./assets/Icon/Notify.png");
const Peopleicon = require("./assets/Icon/Person.png");
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
      }}
    >
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
  const currentUserData = UserData();
  const [logedin, setlogedin] = useState();
  //chaneg to true
  const [SplashScreenvisible, setSplashScreenvisible] = useState(false);
  const [count, setcount] = useState(0);
  const currentuser = useauth();

  useEffect(() => {
    if (currentuser) {
      setlogedin(true);
    } else {
      setlogedin(false);
    }
  }, [currentuser]);

  //make an function run only for first five seconds
  const fivesec = setTimeout(() => {
    if (count < 5) {
      const increase = count + 1;
      setcount(increase);
    }
  }, 1000);
  useEffect(() => {
    if (count < 3) {
      setSplashScreenvisible(true);
    } else {
      setSplashScreenvisible(false);
    }
  }, [count]);

  return (
    <Stack.Navigator initialRouteName="">
      {SplashScreenvisible ? (
        <>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : null}
      {logedin && !SplashScreenvisible && currentUserData?.array?.UserName ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{ headerShown: true }}
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
        </>
      ) : (
        [
          !SplashScreenvisible && !logedin ? (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignINScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : !SplashScreenvisible && !currentUserData?.array?.UserName ? (
            <Stack.Screen
              name="UserDetails"
              component={UserDetailsEditScreen}
              options={{ headerShown: false }}
            />
          ) : null,
        ]
      )}
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
