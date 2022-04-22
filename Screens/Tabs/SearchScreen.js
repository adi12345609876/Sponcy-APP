import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";

// or any pure javascript modules available in npm
import { useNavigation } from "@react-navigation/native";
import { Announces } from "../../BACKEND/Announce";
import { Usersforchat } from "../../BACKEND/firebase";
import { styles } from "../../Features/Styles";
import { TimestamptoTime } from "../../Hooks/GlobalHooks";
import SearchItem from "../../FlatlistItem/SearchItem";
import { Avatar, Card } from "react-native-paper";
import { AdMobBanner } from "expo-ads-admob";

export default function App({ route }) {
  const AnnounceData = Announces();
  const AllUsers = Usersforchat();
  const navigation = useNavigation();
  const [Searchtext, setSearchtext] = useState("");

  const renderMesages = ({ item }) => {
    const Time = TimestamptoTime(item?.time);
    const SearchFilter =
      item?.message?.toLowerCase()?.includes(Searchtext?.toLowerCase()) ||
      item?.UserName?.toLowerCase()?.includes(Searchtext?.toLowerCase());
    return (
      <>
        {SearchFilter && (
          <>
            <SearchItem
              icon={item?.UserPhoto}
              message={item.message}
              photo={item.PhotoURL}
              name={item.UserName}
              likes={item.Like}
              time={Time.time}
              id={item.id}
              user={item.currentuser}
              LikedUsers={item.LikedUser}
            />
          </>
        )}
      </>
    );
  };
  const renderUsers = ({ item }) => {
    const SearchFilter = item?.UserName?.toLowerCase()?.includes(
      Searchtext?.toLowerCase()
    );

    return (
      <>
        {SearchFilter && (
          <Card style={{ width: 200, height: 200, marginRight: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Portfolio", {
                  useruid: item?.uid,
                })
              }
            >
              <Card.Title
                title={item?.UserName}
                subtitle={item?.Biodata}
                titleStyle={{ maxWidth: 100 }}
                left={() => (
                  <Avatar.Image size={50} source={{ uri: item?.PhotoURL }} />
                )}
              />
            </TouchableOpacity>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      <View style={styles.container1}>
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
          {Searchtext != "" && (
            <TouchableOpacity
              style={[styles.Searchbox, { marginRight: 20 }]}
              onPress={() => setSearchtext("")}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ height: 50, alignItems: "center" }}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-2241821858793323/8713857097"
          />
        </View>
        <Text
          style={[styles.Smalltext, { textAlign: "left", paddingLeft: 20 }]}
        >
          recommendation
        </Text>

        <FlatList data={AllUsers} renderItem={renderUsers} horizontal />
        <FlatList data={AnnounceData} renderItem={renderMesages} />
      </View>
    </>
  );
}
