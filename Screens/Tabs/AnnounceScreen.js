import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import renderSeparator from "../../components/SuperComp/Separator";
import { Announces, db } from "../../BACKEND/firebase";
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
//data
// const Netflixdata = {
//   id: 1,
//   name: "Netflix",
//   image: DummyNetflixIcon,
//   checked: true,
// };

// const Tesladata = {
//   id: 2,
//   name: "Tesla",
//   image: DummyTeslaIcon,
//   checked: true,
// };

// const Adinathdata = {
//   id: 3,
//   name: "Adinath",
//   image: null,
//   checked: false,
// };

// const DummyData = [
//   {
//     ...Tesladata,
//     message:
//       "Instead of buying the Apple Cloth, Musk recommends getting the Tesla Cyberwhistle!",
//     photo: photo1,
//     time: "1:01",
//   },
//   {
//     ...Adinathdata,
//     message: "our new app is launchin next month",
//     photo: photo2,
//     time: "1:02",
//   },
//   {
//     ...Netflixdata,
//     message: "we are interested to support new directors",
//     photo: null,
//     time: "2 days",
//   },
//   {
//     ...Tesladata,
//     message: null,
//     photo: photo3,
//     time: "3 days",
//   },
// ];

//render

export default function AssetExample() {
  const AnnounceData = Announces();
  // const PostedUser = PostedUserData();
  // const [PostedUser, setPostedUser] = useState();

  // function getuser(uid) {
  //   PostedUserData(uid);
  // }
  // function PostedUserData(uid) {
  //   if (uid) {
  //     const doclocation = doc(db, "Users", uid);
  //     onSnapshot(doclocation, (snapshot) => {
  //       setPostedUser({
  //         ...snapshot.data(),
  //         id: snapshot.id,
  //       });
  //     });
  //   }
  // }

  AnnounceData?.map((announce) => {
    console.log(announce);
  });

  const renderItem = ({ item }) => {
    return (
      <>
        <AnnounceItem
          message={item.message}
          photo={item.PhotoURL}
          name={item.name}
          icon={item.UserPhoto}
          // checked={item.checked}
          time={item.time}
          id={item.id}
          user={item.currentuser}
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
