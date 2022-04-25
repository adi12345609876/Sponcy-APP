import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import { Colors } from "../../Features/Colors";
//assets
import { UserData, Usersforchat } from "../../BACKEND/firebase";
//feautres
import { styles } from "../../Features/Styles";

export default function AssetExample({ navigation }) {
  const userdetails = UserData();
  const AllUsers = Usersforchat();

  function compare2arrays() {
    const Dudesid = Followers?.filter((d) => {
      return userdetails?.Following?.includes(d);
    });
    //filter user

    const FollowersFilter = AllUsers?.filter((users) => {
      return userdetails?.Followers?.includes(users?.id);
    });

    const FollowingFilter = AllUsers?.filter((users) => {
      return userdetails?.Following?.includes(users?.id);
    });

    const DudesFilter = AllUsers?.filter((users) => {
      return Dudesid?.includes(users?.id);
    });

    return {
      Followersdata: FollowersFilter,
      Followingdata: FollowingFilter,
      Dudesdata: DudesFilter,
    };
  }
  const DetailsUserData = compare2arrays();

  const Followers = DetailsUserData.Followersdata;
  const Following = DetailsUserData.Followingdata;
  const Dudes = DetailsUserData.Dudesdata;

  const PeopleData = [
    {
      title: "Followers",
      data: Followers ? [...Followers] : null,
    },
    {
      title: "Following",
      data: Following ? [...Following] : null,
    },
    {
      title: "Dudes",
      data: Dudes ? [...Dudes] : null,
    },
  ];

  return (
    <>
      {Followers ? (
        <View style={styles.Peoplecontainer}>
          <FlatList
            data={PeopleData}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: Colors.grey,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
                <FlatList
                  data={item?.data}
                  horizontal
                  ListEmptyComponent={<View style={{ height: 100 }}></View>}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                        marginHorizontal: 15,
                      }}
                      onPress={() =>
                        navigation.navigate("Portfolio", {
                          useruid: item?.id,
                        })
                      }
                    >
                      <Image
                        style={styles.image}
                        source={{ uri: item?.PhotoURL ? item?.PhotoURL : null }}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {item?.UserName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      ) : null}
    </>
  );
}
