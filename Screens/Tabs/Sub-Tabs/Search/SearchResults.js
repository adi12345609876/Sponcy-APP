import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Colors } from "../../../../Features/Colors";
// or any pure javascript modules available in npm
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import {
  AddSearchhistory,
  Announces,
  GetSearchhistory,
} from "../../../../BACKEND/Announce";
import { Usersforchat } from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import { useLoading } from "../../../../Hooks/LoadingContext";
import { styles } from "../../../../Features/Styles";
import { showtoast } from "../../../../Features/Utils";
import { relativetime, TimestamptoTime } from "../../../../Hooks/GlobalHooks";
import SearchItem from "../../../../FlatlistItem/SearchItem";
import { AdMobBanner } from "expo-ads-admob";

export default function App({ route }) {
  const { previousSearchtext } = route.params;
  const SearchAnnounce = Announces();
  const currentuser = useauth();
  const navigation = useNavigation();
  const [Searchtext, setSearchtext] = useState();
  useEffect(() => {
    setSearchtext(previousSearchtext);
  }, []);
  const renderItem = ({ item }) => {
    const Time = relativetime(item?.time);

    const SearchFilter =
      item?.message
        ?.toLowerCase()
        ?.includes(previousSearchtext?.toLowerCase()) ||
      item?.UserName?.toLowerCase()?.includes(
        previousSearchtext?.toLowerCase()
      );

    return (
      <>
        {SearchFilter && (
          <SearchItem
            icon={item?.UserPhoto}
            message={item.message}
            photo={item.PhotoURL}
            name={item.UserName}
            // checked={item.checked}
            likes={item.Like}
            time={Time}
            id={item.id}
            user={item.currentuser}
            LikedUsers={item.LikedUser}
            Searchtext={previousSearchtext}
            // Type={item.Type}
          />
        )}
      </>
    );
  };
  async function HandleSearch() {
    navigation.navigate("SearchResults", {
      previousSearchtext: Searchtext,
    });
  }
  return (
    <>
      <View
        style={[styles.container1, { paddingTop: Constants.statusBarHeight }]}
      >
        <View style={styles.sectionStyle}>
          <TouchableOpacity
            style={{
              marginLeft: 15,
              borderRadius: 10,
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={Colors.black}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.Searchinput}
            placeholder="Search"
            underlineColorAndroid="transparent"
            textAlign="left"
            clearButtonMode="always"
            onChangeText={setSearchtext}
            value={Searchtext}
          />
          <TouchableOpacity
            style={[styles.Searchbox, { marginRight: 20 }]}
            onPress={() => HandleSearch()}
          >
            <EvilIcons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 100, borderRadius: 20 }}>
          <AdMobBanner
            bannerSize="largeBanner"
            adUnitID="ca-app-pub-2241821858793323/8713857097"
          />
        </View>
        <FlatList
          data={SearchAnnounce}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </>
  );
}
