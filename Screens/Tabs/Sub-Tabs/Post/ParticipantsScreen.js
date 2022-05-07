import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
//expo
//components

import renderSeparator from "../../../../components/SuperComp/Separator";
//assets
import { Usersforchat } from "../../../../BACKEND/firebase";
import ParticipantsItem from "../../../../FlatlistItem/ParticipantsItem";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Colors";
import { useNavigation } from "@react-navigation/native";

//features

export default function AssetExample() {
  const navigation = useNavigation();

  var userdata = Usersforchat();

  const [Users, setuserdata] = useState(userdata);
  useEffect(() => {
    setuserdata(userdata);
  }, [userdata]);

  const onUpdateValue = (index, value) => {
    Users[index].selected = value;
    return setuserdata([...Users]);
  };
  function handledone() {
    navigation.navigate("CreateRooms", { selectedId });
  }
  const Usersrender = ({ item, index }) => (
    <ParticipantsItem
      name={item.UserName}
      icon={item.PhotoURL}
      id={item.id}
      index={index}
      selected={item.selected}
      onUpdateValue={onUpdateValue}
    />
  );

  const selectedId = Users?.filter((item) => item?.selected).map(
    (item) => item.id
  );

  return (
    <View>
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
    </View>
  );
}
