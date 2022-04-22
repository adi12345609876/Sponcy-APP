import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  TextInput,
} from "react-native";
//expo
//components
import AnimatedScroolView from "../../../../components/Animation/AnimatedScroolTab";

import renderSeparator from "../../../../components/SuperComp/Separator";
//assets
import { styles } from "../../../../Features/Styles";
import { Ionicons, EvilIcons, Entypo } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { ChatRooms, Usersforchat } from "../../../../BACKEND/firebase";
import { useauth } from "../../../../BACKEND/Auth";
import ParticipantsItem from "../../../../FlatlistItem/ParticipantsItem";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../../../Features/Colors";
import { useNavigation } from "@react-navigation/native";
import { SuperButton } from "../../../../components/SuperComp/SuperComp";
//features
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

export default function AssetExample({ route }) {
  const { SelectedId } = route.params;
  const navigation = useNavigation();

  const currentuser = useauth();
  var userdata = Usersforchat();

  const [Users, setuserdata] = useState(userdata);
  const [Searchtext, setSearchtext] = useState("");
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

  const renderUsers = ({ item, index }) => {
    const selectedIds = AllSelecetedIds();

    const SearchFilter = item?.UserName?.toLowerCase()?.includes(
      Searchtext?.toLowerCase()
    );
    const IsSelected = selectedIds?.includes(item?.id);

    return (
      <>
        {SearchFilter && (
          <Card
            style={{
              width: 250,
              height: 100,
              marginBottom: 10,
              backgroundColor: selectedIds?.includes(item?.id)
                ? Colors.primary
                : Colors.white,
            }}
          >
            <TouchableOpacity
              onPress={(value) => {
                onUpdateValue(index, value, item.id);
              }}
              // onLongPress={() => removeuser(item?.id)}
            >
              <Card.Title
                title={item?.UserName}
                subtitle={item?.Biodata}
                titleStyle={{ maxWidth: 100 }}
                left={() => (
                  <Avatar.Image size={50} source={{ uri: item?.PhotoURL }} />
                )}
              />
            </TouchableOpacity>
          </Card>
        )}
      </>
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
            textAlign="left"
            clearButtonMode="always"
            onChangeText={setSearchtext}
            value={Searchtext}
          />
          {Searchtext != "" && (
            <TouchableOpacity
              style={[styles.Searchbox, { marginRight: 20 }]}
              onPress={() => setSearchtext("")}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <SuperButton onPress={handledone} text={"Done"} />
        {/* {Users?.filter((item) => item?.selected).map((item) => (
          <Text>{item?.UserName}</Text>
        ))} */}
        <FlatList data={userdata} renderItem={renderUsers} />
        {/* <FlatList
          data={Users}
          renderItem={Usersrender}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={renderSeparator}
        /> */}
        {/* <TouchableOpacity onPress={handledone}>
          <Text style={{ fontWeight: "bold", color: Colors.black }}>Done</Text>
        </TouchableOpacity> */}
      </View>
    </AnimatedScroolView>
  );
}
