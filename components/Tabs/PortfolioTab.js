import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import Postedmessages from "../../Screens/Tabs/Sub-Tabs/Announce/Postedmess";
import { Colors } from "../../Features/Colors";

import { Announces, currentuserReplies } from "../../BACKEND/Announce";

const Tab = createMaterialTopTabNavigator();
import CommentItem from "../../FlatlistItem/CommentItem";
import { View, FlatList } from "react-native";
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";
export default function Header({ useruid }) {
  const AnnounceData = Announces();
  const currentusercomments = currentuserReplies(useruid);
  const Postedmessages = AnnounceData?.filter(
    (item) => item?.currentuser == useruid
  );
  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);

    return (
      <CommentItem
        message={item.message}
        photo={item.PhotoURL}
        name={item.UserName}
        icon={item.UserPhoto}
        // checked={item.checked}
        time={Time.time}
        id={item.id}
      />
    );
  };
  const PostedItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);

    return (
      <AnnounceItem
        message={item.message}
        photo={item.PhotoURL}
        name={item.UserName}
        icon={item.UserPhoto}
        // checked={item.checked}
        likes={item.Like}
        time={Time.time}
        id={item.id}
        user={item.currentuser}
        LikedUsers={item.LikedUser}
      />
    );
  };

  const Reliedmessages = () => {
    return (
      <View>
        <FlatList
          data={currentusercomments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // ItemSeparatorComponent={renderSeparator}
        />
      </View>
    );
  };
  const UserAnnounces = () => {
    return (
      <View>
        <FlatList
          data={Postedmessages}
          renderItem={PostedItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: Colors.grey,

        indicatorStyle: {
          backgroundColor: Colors.primary,
        },
        labelStyle: {
          fontSize: 9,
        },
        style: {
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen name="Posts" component={UserAnnounces} />
      <Tab.Screen name="Replies" component={Reliedmessages} />
    </Tab.Navigator>
  );
}
