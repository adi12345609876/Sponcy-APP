import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
//expo
//components
import AnimatedScroolView from "../../../../components/Animation/AnimatedScroolTab";

import renderSeparator from "../../../../components/SuperComp/Separator";
//assets
import { styles } from "../../../../Features/Styles";

import { ChatRooms, Usersforchat } from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import ParticipantsItem from "../../../../FlatlistItem/ParticipantsItem";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Colors";
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

    navigation.navigate("EditRooms", { selectedIds });
    // navigation.navigate("EditRooms", { selectedId });
  }

  const Usersrender = ({ item, index }) => {
    // previousUser(item.id);
    const selectedIds = AllSelecetedIds();

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

  let ind = Users?.filter((itemX, index) => {
    yFilter?.includes(itemX.id);
    return index;
  });

  let filteredX = Users?.filter((itemX) => yFilter?.includes(itemX.id));

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
