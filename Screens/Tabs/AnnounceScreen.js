import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
//components
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import renderSeparator from "../../components/SuperComp/Separator";

import { Announces, getUserDetailsCollection } from "../../BACKEND/Announce";

import { Colors } from "../../Features/Colors";
import { styles } from "../../Features/Styles";

//screen
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { doc, onSnapshot } from "firebase/firestore";
import { filterAnnounces, TimestamptoTime } from "../../Hooks/GlobalHooks";
import { useauth } from "../../BACKEND/Auth";
//ADMOB
//Banner Android: ca-app-pub-2241821858793323/8713857097
//Interstitle Android:ca-app-pub-2241821858793323/9318978865
//TEST:ca-app-pub-3940256099942544/6300978111
//Banner ios:ca-app-pub-2241821858793323/4471359754
//Interstitle ios:ca-app-pub-2241821858793323/7835889699

export default function AnnounceScreen({ route }) {
  // const Adref = useRef();
  // const BannerAppid =
  //   Platform.OS === "ios"
  //     ? "ca-app-pub-2241821858793323/4471359754"
  //     : "ca-app-pub-2241821858793323/8713857097";
  // const InterstitleAppid =
  //   Platform.OS === "ios"
  //     ? "ca-app-pub-2241821858793323/7835889699"
  //     : "ca-app-pub-2241821858793323/9318978865";
  // useEffect(async () => {
  //   AdMobInterstitial.setAdUnitID(InterstitleAppid);
  //   await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false });
  //   await AdMobInterstitial.showAdAsync();
  // });
  const [SubScreen, setSubScreen] = useState("Following");
  const RawAnnounces = Announces();
  const currentuser = useauth();
  const userdetails = getUserDetailsCollection(currentuser?.uid);

  const FollowingAnnounce = filterAnnounces(RawAnnounces, userdetails);

  const AnnounceData =
    SubScreen == "Following" ? FollowingAnnounce : RawAnnounces;

  const ads = [];
  const alternate = 5;

  const data = AnnounceData?.reduce((acc, curr, i) => {
    if ((i + 1) % alternate === 0) {
      const adIndex = Math.floor(i / alternate) % ads.length;
      return [...acc, curr, { ...ads[adIndex], IsAds: true }];
    }

    return [...acc, curr];
  }, []);
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
            IsAds={item.IsAds}

            // Type={item.Type}
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
            IsAds={item.IsAds}
          />
        ) : null}
      </>
    );
  };
  return (
    <AnimatedScroolView>
      <View style={styles.announcecontainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={styles.Searchbox}
              onPress={() => setSubScreen("Following")}
            >
              <Text style={styles.Smalltext}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={styles.Searchbox}
              onPress={() => setSubScreen("Announces")}
            >
              <Text style={styles.Smalltext}>All Announces</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </AnimatedScroolView>
  );
}
