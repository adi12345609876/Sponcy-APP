import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
//components

import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import renderSeparator from "../../components/SuperComp/Separator";

import { Announces } from "../../BACKEND/Announce";

import { Colors } from "../../Features/Features";

//screen
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { doc, onSnapshot } from "firebase/firestore";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";

export default function AnnounceScreen({ route, Searchtext }) {
  const AnnounceData = Announces();
  console.log("Searchtext", Searchtext);
  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);

    const SearchFilter =
      item?.message
        ?.toLowerCase()
        ?.includes(route?.params?.Searchtext?.toLowerCase()) ||
      item?.UserName?.toLowerCase()?.includes(
        route?.params?.Searchtext?.toLowerCase()
      );

    return (
      <>
        {SearchFilter ? (
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
        ) : route?.params?.Searchtext == undefined ? (
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
        ) : null}
      </>
    );
  };

  return (
    <AnimatedScroolView>
      <View style={styles.container}>
        <FlatList
          data={AnnounceData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </AnimatedScroolView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.normalwhite,
    marginBottom: 100,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
});
