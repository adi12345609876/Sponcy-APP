import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
//components
import { Colors } from "../../Features/Colors";
//assets
import { UserData, Usersforchat } from "../../BACKEND/firebase";
//feautres
import { styles } from "../../Features/Styles";
import { Avatar } from "react-native-paper";

export default function AssetExample({ navigation }) {
  const userdetails = UserData();
  const AllUsers = Usersforchat();
  const DetailsUserData = compare2arrays();
  const Followers = DetailsUserData.Followersdata;
  const Following = DetailsUserData.Followingdata;
  const Dudes = DetailsUserData.Dudesdata;
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

  const PeopleData = [
    {
      title: "Followers",
      data: Followers ? [...Followers] : null,
      id: 1,
    },
    {
      title: "Following",
      data: Following ? [...Following] : null,
      id: 2,
    },
    {
      title: "Dudes",
      data: Dudes ? [...Dudes] : null,
      id: 3,
    },
  ];

  return (
    <>
      {Followers ? (
        <View style={styles.Peoplecontainer}>
          <FlatList
            data={PeopleData}
            keyExtractor={(item) => item.id}
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
                      <Avatar.Image
                        size={50}
                        source={{ uri: item?.PhotoURL ? item?.PhotoURL : null }}
                        style={{ backgroundColor: Colors.grey }}
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
