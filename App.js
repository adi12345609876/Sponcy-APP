import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as Notifications from "expo-notifications";
//react-navigation
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Backend
import { useauth } from "./BACKEND/Auth";
import { getUserDetailsCollection } from "./BACKEND/Announce";
//Hooks
import TabBarprovider from "./Hooks/TabBarprovider";
import LoadingProvider from "./Hooks/LoadingContext";
import StateContext, { UseState } from "./Hooks/StateContext";
//components
import TabBar from "./components/Tabs/BottomTab";
import Header from "./components/Tabs/HeaderTab";
import DrawerContent from "./components/Tabs/DrawerContent";
import { styles } from "./Features/Styles";
import { Colors } from "./Features/Colors";
import {
  SuperContainerImage,
  SuperFAB,
  SuperIcons,
} from "./components/SuperComp/SuperComp";
//screens
import SignINScreen from "./Screens/Auth/SignIN";
import HomeChatScreen from "./Screens/Tabs/HomeChatScreen";
import AnnounceScreen from "./Screens/Tabs/AnnounceScreen";
import NotifyScreen from "./Screens/Tabs/NotificationScreen";
import PeopleScreen from "./Screens/Tabs/peopleScreen";
import PortfolioScreen from "./Screens/Tabs/Sub-Tabs/Announce/PortfolioScreen";
import ChatScreen from "./Screens/Tabs/Sub-Tabs/Home/ChatScreen";
import SearchScreen from "./Screens/Tabs/SearchScreen";
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
import SettingsScreen from "./Screens/Drawer/Settings";
import ReAuthScreen from "./Screens/Auth/ReAuth";
import SearchResultsScreen from "./Screens/Tabs/Sub-Tabs/Search/SearchResults";

//navigation providers
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
//icons
const Homeicon = require("./assets/Icon/Chat.png");
const Announceicon = require("./assets/Icon/Announce.png");
const Searchicon = require("./assets/Icon/Search.png");
const Peopleicon = require("./assets/Icon/Person.png");
// * Notification Settings
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function MyTabs() {
  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator
        initialRouteName="Announce"
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
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
          name="Search"
          component={SearchScreen}
          initialParams={{ icon: Searchicon }}
        />
        <Tab.Screen
          name="People"
          component={PeopleScreen}
          initialParams={{ icon: Peopleicon }}
        />
      </Tab.Navigator>

      <SuperFAB
        Subbuttons={[
          {
            icon: Homeicon,
            onPress: () => navigation.navigate("CreateRooms"),
            bgc: Colors.white,

            number: 2,
            text: "Create Rooms",
          },
          {
            icon: Announceicon,
            number: 1,
            onPress: () => navigation.navigate("Post"),
            bgc: Colors.white,

            text: "Announce",
          },
        ]}
      />
    </>
  );
}

function MyStack() {
  const currentuser = useauth();
  const [loading, setloading] = useState(true);
  const { LogedIn, setLogedIn } = UseState();
  //* This Code sets whether the user is loged or not
  useEffect(() => {
    if (currentuser == undefined) {
      setLogedIn("NoUser");
    } else if (currentuser && currentuser?.displayName == undefined) {
      setLogedIn("NoName");
    } else if (currentuser && currentuser?.displayName) {
      setLogedIn("SignedIN");
    }
  }, [currentuser]);
  //* gives a 2 seconds time for the above code to lode
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  //* loading screen
  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <>
      <Stack.Navigator>
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
              name="ReAuth"
              component={ReAuthScreen}
              options={{ headerShown: false }}
            />
      
            <Stack.Screen
              name="SuperContainerImage"
              component={SuperContainerImage}
              options={{ headerShown: false, animation: "fade" }}
            />
            <Stack.Screen
              name="SearchResults"
              component={SearchResultsScreen}
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
              name="NotifyScreen"
              component={NotifyScreen}
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
    </>
  );
}

function MyDrawer() {



  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        header: (props) => <Header {...props} />,
        activeBackgroundColor: "#000",
        activeTintColor: "#ffffff",
      }}

    >
      <Drawer.Screen
        name="Tabs"
        component={MyTabs}
        options={{
          drawerIcon: ({ focused, size }) => (
            <SuperIcons
              name="Dashboard"
              size={size}
              color={focused ? Colors.black : Colors.black}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <SuperIcons
              name="Settings"
              size={size}
              color={focused ? Colors.black : Colors.black}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <StateContext>
      <LoadingProvider>
        <TabBarprovider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </TabBarprovider>
      </LoadingProvider>
    </StateContext>
  );
}
