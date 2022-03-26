import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
//components

import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import renderSeparator from "../../components/SuperComp/Separator";
import { Announces, SpecifiedUserData } from "../../BACKEND/firebase";
//assets
// import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
// import DummyTeslaIcon from "../assets/Photos/Dummyicon/Tesla.png";
// import photo1 from "../assets/Photos/Dummyphotos/photo1.png";
// import photo2 from "../assets/Photos/Dummyphotos/photo2.png";
// import photo3 from "../assets/Photos/Dummyphotos/Drone.png";
import { Colors } from "../../Features/Features";

//screen
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { doc, onSnapshot } from "firebase/firestore";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";

export default function AssetExample() {
  const AnnounceData = Announces();
  // const Usersdata = SpecifiedUserData("D4hiAV30QlMT46Pp1XOxwPLcj0u2");
  // console.log("SpecificUser", Usersdata);

  AnnounceData?.map((announce) => {
    console.log(announce);
  });

  const renderItem = ({ item }) => {
    const Time = TimestamptoTime(item?.time);
    console.log("TIME:", Time);

    return (
      <>
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
