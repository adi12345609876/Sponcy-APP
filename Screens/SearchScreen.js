import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Colors } from "../Features/Colors";
// or any pure javascript modules available in npm
import { useNavigation } from "@react-navigation/native";
import {
  AddSearchhistory,
  Announces,
  GetSearchhistory,
} from "../BACKEND/Announce";
import { Usersforchat } from "../BACKEND/firebase";
import { useauth } from "../BACKEND/Auth";
import { useLoading } from "../Hooks/LoadingContext";
import { styles } from "../Features/Styles";

export default function App({ route }) {
  const AnnounceData = Announces();

  const AllUsers = Usersforchat();
  const currentuser = useauth();
  const Searchhistory = GetSearchhistory(currentuser?.uid);

  const navigation = useNavigation();
  const { ScreenName } = route.params;
  const { setshowLoading, showLoading } = useLoading();

  const [Searchtext, setSearchtext] = useState("");
  const [History, setHistory] = useState();

  Searchhistory.then((doc) => {
    setHistory(doc);
  });

  async function HandleSearch() {
    setshowLoading(true);
    await AddSearchhistory(currentuser?.uid, Searchtext);
    navigation.navigate("Tabs", {
      screen: ScreenName,

      params: { Searchtext: Searchtext },
    });
    setshowLoading(false);
  }
  const renderMesages = ({ item }) => {
    const SearchFilter = item?.message
      ?.toLowerCase()
      ?.includes(Searchtext?.toLowerCase());

    return (
      <>
        {SearchFilter ? (
          <View style={styles.recent}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.white,
              }}
              onPress={() => setSearchtext(item.message)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {item.message}
              </Text>
            </TouchableOpacity>
          </View>
        ) : Searchtext == undefined ? (
          <View style={styles.recent}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.white,
              }}
              onPress={() => setSearchtext(item.message)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {item.message}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  };
  const renderUsers = ({ item }) => {
    const SearchFilter = item?.UserName?.toLowerCase()?.includes(
      Searchtext?.toLowerCase()
    );

    return (
      <>
        {SearchFilter ? (
          <View style={styles.recent}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.white,
              }}
              onPress={() => setSearchtext(item.UserName)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {item.UserName}
              </Text>
            </TouchableOpacity>
          </View>
        ) : Searchtext == undefined ? (
          <View style={styles.recent}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.white,
              }}
              onPress={() => setSearchtext(item.UserName)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {item.UserName}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
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
            autoComplete
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
        <Text>History</Text>

        {History?.Searchtext?.toLowerCase()?.includes(
          Searchtext?.toLowerCase()
        ) ? (
          <View style={styles.recent}>
            <View style={{ marginRight: 10 }}>
              <Ionicons name="refresh" size={20} color="grey" />
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.white,
              }}
              onPress={() => setSearchtext(History?.Searchtext)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {History?.Searchtext}
              </Text>
            </TouchableOpacity>
          </View>
        ) : Searchtext == undefined ? (
          <View style={styles.recent}>
            <View style={{ marginRight: 10 }}>
              <Ionicons name="refresh" size={20} color="grey" />
            </View>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Colors.white,
              }}
              onPress={() => setSearchtext(History?.Searchtext)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Colors.grey,
                }}
              >
                {History?.Searchtext}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Text>recommendation</Text>

        <FlatList data={AnnounceData} renderItem={renderMesages} />

        <Text>Peoples</Text>
        <FlatList data={AllUsers} renderItem={renderUsers} />

        {/* <AnnounceScreen Searchtext={Searchtext} /> */}
      </View>
    </>
  );
}
