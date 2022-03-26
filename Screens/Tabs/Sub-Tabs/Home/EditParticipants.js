import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//expo
//components
import AnimatedScroolView from "../../../../components/Animation/AnimatedScroolTab";

import renderSeparator from "../../../../components/SuperComp/Separator";
//assets
// import DummyNetflixIcon from "../assets/Photos/Dummyicon/Netflix.png";
import {
  ChatRooms,
  Usersforchat,
  updatedb,
} from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import ParticipantsItem from "../../../../FlatlistItem/ParticipantsItem";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Features";
import { useNavigation } from "@react-navigation/native";
//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

export default function AssetExample({ route }) {
  const { SelectedId } = route.params;
  const navigation = useNavigation();

  const currentuser = useauth();
  var userdata = Usersforchat();

  const [Users, setuserdata] = useState(userdata);
  useEffect(() => {
    setuserdata(userdata);
  }, [userdata]);

  useEffect(() => {}, []);
  const onUpdateValue = (index, value, id) => {
    Users[index].selected = value;

    // console.log(Users);
    return setuserdata([...Users]);
  };
  function AllSelecetedIds() {
    if (selectedId && SelectedId) {
      var joinedarray = [...selectedId, ...SelectedId];
    }
    return joinedarray;
  }
  function handledone() {
    const selectedIds = AllSelecetedIds();
    console.log("Participants:", selectedIds);

    navigation.navigate("EditRooms", { selectedIds });
    // navigation.navigate("EditRooms", { selectedId });
  }

  const Usersrender = ({ item, index }) => {
    // previousUser(item.id);
    const selectedIds = AllSelecetedIds();

    // console.log("ITEM", item.selected);
    // console.log("JoinedArray:", selectedIds);

    return (
      <ParticipantsItem
        name={item.UserName}
        icon={item.PhotoURL}
        id={item.id}
        index={index}
        selected={item.selected}
        onUpdateValue={onUpdateValue}
      />
    );
  };

  const selectedId = Users?.filter((item) => item?.selected).map(
    (item) => item.id
  );

  let yFilter = SelectedId.map((itemY) => {
    return itemY;
  });
  console.log("2Seletyetdid", SelectedId);

  let ind = Users?.filter((itemX, index) => {
    yFilter?.includes(itemX.id);
    return index;
  });
  console.log("2selectedidfilter", ind);

  let filteredX = Users?.filter((itemX) => yFilter?.includes(itemX.id));

  console.log("2`All Seleceted Users", filteredX);

  return (
    <AnimatedScroolView>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        {Users?.filter((item) => item?.selected).map((item) => (
          <Text>{item?.UserName}</Text>
        ))}

        <FlatList
          data={Users}
          renderItem={Usersrender}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
        <TouchableOpacity onPress={handledone}>
          <Text style={{ fontWeight: "bold", color: Colors.black }}>Done</Text>
        </TouchableOpacity>
      </View>
    </AnimatedScroolView>
  );
}
//style
const styles = StyleSheet.create({});
