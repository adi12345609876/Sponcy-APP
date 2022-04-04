import React, { useState, useEffect } from "react";
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
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
// You can import from local files
import { Colors } from "../Features/Features";
import AnnounceScreen from "./Tabs/AnnounceScreen";

import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
import DummyTeslaIcon from "../assets/Photos/Dummyicon/Tesla.png";
// or any pure javascript modules available in npm
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AddSearchhistory,
  Announces,
  GetSearchhistory,
} from "../BACKEND/Announce";
import { Usersforchat } from "../BACKEND/firebase";
import { async } from "@firebase/util";
import { useauth } from "../BACKEND/Auth";

const DummyData = [
  {
    data: [
      { text: "Netflix New Show", image: null },
      { text: "Instead of Buying Aplle buy tesla cloth", image: null },
    ],
    type: "message",
  },
  {
    data: [
      { text: "Elon Musk", image: DummyTeslaIcon },
      { text: "Netflix", image: DummyNetflixIcon },
    ],
    type: "People",
  },
];
export default function App({ route }) {
  const AnnounceData = Announces();
  const AllUsers = Usersforchat();
  const currentuser = useauth();
  const Searchhistory = GetSearchhistory(currentuser?.uid);

  const navigation = useNavigation();
  const { ScreenName } = route.params;

  const [Searchtext, setSearchtext] = useState("");
  const [History, setHistory] = useState();

  Searchhistory.then((doc) => {
    setHistory(doc);
  });

  // console.log("HISTORY", History?.Searchtext);

  async function HandleSearch() {
    await AddSearchhistory(currentuser?.uid, Searchtext);
    navigation.navigate("Tabs", {
      screen: ScreenName,

      params: { Searchtext: Searchtext },
    });
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
            style={styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
            autoComplete
            textAlign="left"
            clearButtonMode="always"
            onChangeText={setSearchtext}
            value={Searchtext}
          />

          <TouchableOpacity
            style={{
              marginRight: 20,
              borderRadius: 10,
              backgroundColor: Colors.grey,
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
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

const styles = StyleSheet.create({
  recent: {
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: "grey",
    // borderBottomWidth: 0.5,
    // borderTopWidth: 0.5,
    width: "100%",
    alignItems: "flex-end",
    maxWidth: deviceWidth,
  },
  container1: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 40,
    maxWidth: deviceWidth,
  },
  input: {
    width: "80%",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "450",
    marginLeft: 10,
    maxWidth: deviceWidth,
  },
  sectionStyle: {
    maxWidth: deviceWidth - 10,

    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    margin: 10,
    maxHeight: 100,
    alignSelf: "flex-start",
  },
});

/* <FlatList
              data={item.data}
              horizontal={item.type == "People"}
              ListEmptyComponent={<View style={{ height: 100 }}></View>}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    margin: 10,
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    paddingVertical: 10,
                    marginHorizontal: 15,
                    flexDirection: "row",
                    maxHeight: 50,
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <Ionicons name="refresh" size={20} color="grey" />
                  </View>

                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "grey",
                    }}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>
              )}
            /> */
