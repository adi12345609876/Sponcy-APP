import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
//components
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import renderSeparator from "../../components/SuperComp/Separator";

import { Announces, getUserDetailsCollection } from "../../BACKEND/Announce";
import AnimatedFlatList from "../../components/Animation/AnimatedFlatList";
import { Colors } from "../../Features/Colors";
import { styles } from "../../Features/Styles";

//screen
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { doc, onSnapshot } from "firebase/firestore";
import { filterAnnounces, TimestamptoTime } from "../../Hooks/GlobalHooks";
import { useauth } from "../../BACKEND/Auth";
import { useTabBar } from "../../Hooks/TabBarprovider";
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
  const [SubScreen, setSubScreen] = useState("Announces");
  const RawAnnounces = Announces();
  const currentuser = useauth();
  const userdetails = getUserDetailsCollection(currentuser?.uid);

  const FollowingAnnounce = filterAnnounces(RawAnnounces, userdetails);

  const data = SubScreen == "Following" ? FollowingAnnounce : RawAnnounces;
  const animation = useRef(new Animated.Value(0)).current;
  const { showTabBar } = useTabBar();
  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -200,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };
  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);
  const renderItem = ({ item, index }) => {
    const Time = TimestamptoTime(item?.time);

    return (
      <>
        <AnnounceItem
          icon={item?.UserPhoto}
          message={item.message}
          photo={item.PhotoURL}
          name={item.UserName}
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
  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={[
                styles.Searchbox,
                {
                  backgroundColor:
                    SubScreen == "Following" ? Colors.primary : Colors.grey,
                },
              ]}
              onPress={() => setSubScreen("Following")}
            >
              <Text style={styles.Smalltext}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={[
                styles.Searchbox,
                {
                  backgroundColor:
                    SubScreen == "Announces" ? Colors.primary : Colors.grey,
                },
              ]}
              onPress={() => setSubScreen("Announces")}
            >
              <Text style={styles.Smalltext}>All Announces</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100, borderRadius: 20 }}>
          <AdMobBanner
            bannerSize="largeBanner"
            adUnitID="ca-app-pub-2241821858793323/8713857097"
          />
        </View>
      </>
    );
  };

  return (
    <View>
      <SafeAreaView style={styles.announcecontainer}>
        <AnimatedFlatList
          TopofList={renderHeader}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={renderSeparator}
        />
      </SafeAreaView>
    </View>
  );
}
