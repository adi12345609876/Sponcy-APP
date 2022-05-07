import React from "react";
import {
  View,
  FlatList,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
//components
import NotifyItem from "../../FlatlistItem/NotifyItem";
import {
  ChatRooms,
  getNotifies,
  OneOneMess,
  Usersforchat,
} from "../../BACKEND/firebase";
import { useauth } from "../../BACKEND/Auth";
import { getUserDetailsCollection } from "../../BACKEND/Announce";
//assets
import LottieView from "lottie-react-native";

import { styles } from "../../Features/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../Features/Colors";

//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

export default function AssetExample({ navigation }) {
  const currentuser = useauth();
  const Notifies = getNotifies(currentuser?.uid);
  const Rooms = ChatRooms();
  const OnetoOne = OneOneMess(currentuser?.uid);
  const userdetails = getUserDetailsCollection(currentuser?.uid);
  const AllUsers = Usersforchat();

  function compare2arrays(Bigarray, Smallarray) {
    // const [Details, setDetails] = useState();
    // if (Smallarray) {
    //   Smallarray?.then((doc) => {
    //     setDetails(doc);
    //   });
    // }
    // const m = Details?.Following;

    //filter user
    const filtered = Bigarray?.filter((users) => {
      return Smallarray?.Following?.includes(users?.id);
    });

    return filtered;
  }
  const DetailsUserData = compare2arrays(AllUsers, userdetails);
  const TotalNotifies = Notifies?.filter((item) => {
    return item?.Seen == false;
  }).length;

  const renderItem = ({ item }) => {
    return (
      <NotifyItem
        Type={item.Type}
        message={item.message}
        url={item.url}
        id={item.id}
        Seen={item.Seen}
      />
    );
  };
  // const UserrenderItem = ({ item }) => (
  //   <NotifyItem
  //     name={item.UserName}
  //     icon={item?.PhotoURL}
  //     UnreadSeenUsers={item.UnseenUsers}
  //     id={item.id}
  //     participants={item.Participants}
  //   />
  // );
  // const OnetoOnerenderItem = ({ item }) => (
  //   <NotifyItem
  //     name={item.RoomName}
  //     icon={item.icon}
  //     LastMessage={item.LastMessage}
  //     Seen={item.Seen}
  //     id={item.id}
  //     Type={item.Type}
  //   />
  // );
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          height: 45,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={[
            styles.Searchbox,
            { marginLeft: 10, position: "absolute", top: 10 },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color={Colors.black} />
        </TouchableOpacity>
        <View style={{ right: 70, position: "absolute", top: 0 }}>
          <Text style={styles.Bigtext}>{TotalNotifies} Notification</Text>
        </View>
      </View>
      <View
        style={{ backgroundColor: Colors.black, width: 1000, height: 1 }}
      ></View>
      <FlatList
        data={Notifies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              height: deviceHeight / 2,
            }}
          >
            <LottieView
              autoPlay
              loop
              source={require("../../assets/Lottie/No_Notify.json")}
            />
            <Text style={[styles.Mediumtext, { color: Colors.primary }]}>
              No Notifications yet
            </Text>
          </View>
        )}
      />
      {/* <FlatList
          data={DetailsUserData}
          renderItem={UserrenderItem}
          keyExtractor={(item) => item.id}
        />
        <FlatList
          data={OnetoOne}
          renderItem={OnetoOnerenderItem}
          keyExtractor={(item) => item.id}
        /> */}
    </SafeAreaView>
  );
}
