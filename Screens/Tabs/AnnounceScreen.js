import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
//components
import { AdMobBanner } from "expo-ads-admob";
import renderSeparator from "../../components/SuperComp/Separator";

import { Announces, getUserDetailsCollection } from "../../BACKEND/Announce";
import AnimatedFlatList from "../../components/Animation/AnimatedFlatList";
import { Colors } from "../../Features/Colors";
import { deviceWidth, styles } from "../../Features/Styles";

//screen
import AnnounceItem from "../../FlatlistItem/AnnounceItem";
import { filterAnnounces, relativetime } from "../../Hooks/GlobalHooks";
import { useauth } from "../../BACKEND/Auth";
import { useTabBar } from "../../Hooks/TabBarprovider";
import { Banner_Android } from "../../Features/GlobalConsts";
//ADMOB

export default function AnnounceScreen() {
  const [SubScreen, setSubScreen] = useState("Announces");
  const RawAnnounces = Announces();
  const currentuser = useauth();
  const userdetails = getUserDetailsCollection(currentuser?.uid);
  const [Like, setLike] = React.useState(new Map());
  const onLike = React.useCallback(
    (id) => {
      const newLike = new Map(Like);
      newLike.set(id, !Like.get(id));

      console.log(Like.get(id));
      setLike(newLike);
    },
    [Like]
  );
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

  const renderItem = ({ item }) => {
    const Time = relativetime(item?.time);

    return (
      <>
        <AnnounceItem
          icon={item?.UserPhoto}
          message={item.message}
          photo={item.PhotoURL}
          name={item.UserName}
          likes={item.LikedUser?.length}
          time={Time}
          id={item.id}
          user={item.currentuser}
          LikedUsers={item.LikedUser}
          Like={Like != undefined ? Like.get(item?.id) : null}
          onLike={onLike}
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
            alignItems: "center",
            marginVertical: 10,
            justifyContent: "space-around",
            width: deviceWidth,
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <TouchableOpacity
              style={[
                styles.Searchbox,
                {
                  borderRadius: 5,
                  backgroundColor:
                    SubScreen == "Following" ? Colors.primary : Colors.grey,
                },
              ]}
              onPress={() => setSubScreen("Following")}
            >
              <Text
                style={[
                  styles.Smalltext,
                  {
                    color:
                      SubScreen == "Following" ? Colors.white : Colors.black,
                  },
                ]}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={[
                styles.Searchbox,
                {
                  borderRadius: 5,
                  backgroundColor:
                    SubScreen == "Announces" ? Colors.primary : Colors.grey,
                },
              ]}
              onPress={() => setSubScreen("Announces")}
            >
              <Text
                style={[
                  styles.Smalltext,
                  {
                    color:
                      SubScreen == "Announces" ? Colors.white : Colors.black,
                  },
                ]}
              >
                All Announces
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ height: 100, borderRadius: 20 }}> */}
        <AdMobBanner bannerSize="banner" adUnitID={Banner_Android} />
        {/* </View> */}
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
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
          extraData={Like}
        />
      </SafeAreaView>
    </View>
  );
}
