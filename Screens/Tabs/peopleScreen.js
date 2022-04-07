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
import { Usersforchat } from "../../BACKEND/firebase";
import { getUserDetailsCollection } from "../../BACKEND/Announce";
import { useauth } from "../../BACKEND/Auth";
//feautures
import { styles } from "../../Features/Styles";

export default function AssetExample({ navigation }) {
  const currentuser = useauth();
  const userdetails = getUserDetailsCollection(currentuser?.uid);
  const AllUsers = Usersforchat();
  function compare2arrays() {
    const [Details, setDetails] = useState();
    if (userdetails) {
      userdetails?.then((doc) => {
        setDetails(doc);
      });
    }

    const Followers = Details?.Followers;
    const Following = Details?.Following;

    const Dudesid = Followers?.filter((d) => {
      return Following?.includes(d);
    });
    //filter user
    const FollowersFilter = AllUsers?.filter((users) => {
      return Followers?.includes(users?.id);
    });
    const FollowingFilter = AllUsers?.filter((users) => {
      return Following?.includes(users?.id);
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
  const Dudes = DetailsUserData.Dudesdata; //<--He is the person who follows you and you follow him

  const PeopleData = [
    {
      title: "Sponsorer",
      data: [],
    },
    {
      title: "Sponsoring",
      data: [],
    },
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
    <AnimatedScroolView>
      {Followers ? (
        <View style={styles.Peoplecontainer}>
          <FlatList
            data={PeopleData}
            renderItem={({ item }) => (
              <View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: Colors.white,
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
                      <Image style={styles.image} source={item?.PhotoURL} />
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
    </AnimatedScroolView>
  );
}
