import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
// import { LogBox } from "react-native";
//BACKEND
import { UserData } from "./BACKEND/firebase";
//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
//Hooks
import TabBarprovider from "./Hooks/TabBarprovider";
import { useauth } from "./BACKEND/Auth";
//components
import TabBar from "./components/Tabs/BottomTab";
import Header from "./components/Tabs/HeaderTab";

//screens
import SignINScreen from "./Screens/Auth/SignIN";
import HomeChatScreen from "./Screens/Tabs/HomeChatScreen";
import AnnounceScreen from "./Screens/Tabs/AnnounceScreen";
import NotifyScreen from "./Screens/Tabs/NotificationScreen";
import PeopleScreen from "./Screens/Tabs/peopleScreen";
import PortfolioScreen from "./Screens/Tabs/Sub-Tabs/Announce/PortfolioScreen";
import ChatScreen from "./Screens/Tabs/Sub-Tabs/Home/ChatScreen";
import SearchScreen from "./Screens/SearchScreen";
import CommentsScreen from "./Screens/Tabs/Sub-Tabs/Announce/CommentsScreen";
import PostScreen from "./Screens/Tabs/PostScreen";
import EditScreen from "./Screens/Tabs/Sub-Tabs/Post/EditScreen";
import UserDetailsEditScreen from "./Screens/Auth/UserDetails";
import EditMessageScreen from "./Screens/Tabs/Sub-Tabs/Announce/EditMessageScreen";
import CreateRoomsScreen from "./Screens/Tabs/Sub-Tabs/Post/CreateRoomScreen";
import ParticipantsScreen from "./Screens/Tabs/Sub-Tabs/Post/ParticipantsScreen";
import EditRoomsScreen from "./Screens/Tabs/Sub-Tabs/Home/EditRooms";
import EditparticipantsScreen from "./Screens/Tabs/Sub-Tabs/Home/EditParticipants";
import RoomDetailsScreen from "./Screens/Tabs/Sub-Tabs/Home/RoomDetails";
import VerifyScreen from "./Screens/Auth/VerifyScreen";

import LoadingProvider from "./Hooks/LoadingContext";
import DrawerContent from "./components/Tabs/DrawerContent";
import { getUserDetailsCollection } from "./BACKEND/Announce";
//icons
const Homeicon = require("./assets/Icon/Home.png");
const Announceicon = require("./assets/Icon/Announce.png");
const Notifyicon = require("./assets/Icon/Notify.png");
const Peopleicon = require("./assets/Icon/Person.png");
const HomeiconX = require("./assets/Icon/HomeX.png");
const AnnounceiconX = require("./assets/Icon/AnnounceX.png");
const NotifyiconX = require("./assets/Icon/NotifyX.png");
const PeopleiconX = require("./assets/Icon/PersonX.png");
//features
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//ADMOB
//Banner Android: ca-app-pub-2241821858793323/8713857097
//Interstitle Android:ca-app-pub-2241821858793323/9318978865

//Banner ios:ca-app-pub-2241821858793323/4471359754
//Interstitle ios:ca-app-pub-2241821858793323/7835889699

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Announce"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Announce"
        component={AnnounceScreen}
        initialParams={{ icon: Announceicon, iconX: AnnounceiconX }}
      />
      <Tab.Screen
        name="Home"
        component={HomeChatScreen}
        initialParams={{ icon: Homeicon, iconX: HomeiconX }}
      />
      <Tab.Screen
        name="Notify"
        component={NotifyScreen}
        initialParams={{ icon: Notifyicon, iconX: NotifyiconX }}
      />
      <Tab.Screen
        name="People"
        component={PeopleScreen}
        initialParams={{ icon: Peopleicon, iconX: PeopleiconX }}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  // const currentUserData = UserData();
  const currentuser = useauth();
  const [LogedIn, setLogedIn] = useState();
  const [loading, setloading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setloading(false);
  //   }, 2000);
  // }, []);
  useEffect(() => {
    console.log(currentuser);

    if (currentuser == undefined) {
      setLogedIn("NoUser");
    } else if (currentuser?.displayName == undefined) {
      setLogedIn("NoName");
    } else {
      setLogedIn("SignedIN");
    }
  }, [currentuser]);
  return (
    <Stack.Navigator initialRouteName="">
      {LogedIn == "SignedIN" ? (
        <>
          <Stack.Screen
            name="MyDrawer"
            component={MyDrawer}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="Editmessage"
            component={EditMessageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateRooms"
            component={CreateRoomsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Participants"
            component={ParticipantsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="EditRooms"
            component={EditRoomsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Editparticipants"
            component={EditparticipantsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoomDetails"
            component={RoomDetailsScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        [
          LogedIn == "NoUser" ? (
            <Stack.Screen
              name="SignIn"
              component={SignINScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="UserDetails"
              component={UserDetailsEditScreen}
              options={{ headerShown: false }}
            />
          ),
        ]
      )}
    </Stack.Navigator>
  );
}
//!currentuser && !currentUserData?.array?.UserName ?

function MyDrawer() {
  const [Followers, setFollowers] = useState();
  const currentuser = useauth();
  const userdetails = getUserDetailsCollection(currentuser?.uid);

  useEffect(() => {
    if (userdetails) {
      userdetails
        ?.then((doc) => {
          setFollowers(doc?.Followers);
        })
        .catch((e) => console.log("ERER", e));
    }
  }, [userdetails]);
  console.log("FOLLOWIBNG", Followers);

  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen name="Tabs" component={MyTabs} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <TabBarprovider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </TabBarprovider>
    </LoadingProvider>
  );
}
