import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
//components
import AnimatedScroolView from "../../components/Animation/AnimatedScroolTab";
import Nullprofile from "../../Hooks/NullProfile";
import Name from "../../components/SuperComp/Name";
import { Colors } from "../../Features/Features";
//assets
import DummynullProfile from "../../assets/Photos/Dummyicon/actualnullimage.png";
import DummyNetflixIcon from "../../assets/Photos/Dummyicon/Netflix.png";
import DummyTeslaIcon from "../../assets/Photos/Dummyicon/Tesla.png";
import { getUserDetailsCollection, Usersforchat } from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { compare2arrays } from "../../Hooks/GlobalHooks";
//feautures
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

// data
export const Netflixdata = [
  {
    id: 1,
    UserName: "Netflix",
    PhotoURL: DummyNetflixIcon,
    checked: true,
  },
];
export const Tesladata = [
  {
    id: 2,
    UserName: "Tesla",
    PhotoURL: DummyTeslaIcon,
    checked: true,
  },
];
export const Adinathdata = [
  {
    id: 3,
    UserName: "Adinath",
    PhotoURL: null,
    checked: false,
  },
];

const Header = ({ heading }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>{heading}</Text>
  </View>
);
const RenderItems = ({ name, image }) => (
  <TouchableOpacity>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image ? image : Nullprofile({ name })}
      />
      <Name name={name} />
    </View>
  </TouchableOpacity>
);
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
    // console.log("MAPPED", userdetails);
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
    // console.log("FILTERED", filtered);
    return {
      Followersdata: FollowersFilter,
      Followingdata: FollowingFilter,
      Dudesdata: DudesFilter,
    };
  }
  const DetailsUserData = compare2arrays();
  console.log(DetailsUserData);
  const Followers = DetailsUserData.Followersdata;
  const Following = DetailsUserData.Followingdata;
  const Dudes = DetailsUserData.Dudesdata; //<--He is the person who follows you and you follow him

  const PeopleData = [
    {
      title: "Sponsorer",
      data: [...Netflixdata, ...Tesladata],
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
        <View style={styles.container}>
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
                      <Image
                        style={styles.image}
                        source={
                          item?.PhotoURL ? item?.PhotoURL : DummynullProfile
                        }
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
    </AnimatedScroolView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
  },
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 200,
    borderColor: Colors.white,
    borderWidth: 2,
  },
});
