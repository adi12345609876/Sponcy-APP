import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { Card } from "react-native-paper";
import {logout,useauth} from "../BACKEND/firebase"
import { useNavigation } from "@react-navigation/native";
export default function AssetExample({ visibility, height, width,data1,data2,data3,data4,}) {
 const navigation = useNavigation();
  
  const DummyData = [
    {
      ...data1?data1:null,
    },
    {
      ...data2?data2:null,
    },
    {
      ...data3?data3:null,
    },
    {
      ...data4?data4:null,
    },
  ];
  const [selectedId, setSelectedId] = useState(null);
  const [pressfunc, setpressfunc] = useState();

  const renderSeparator = () => (
    <View style={{ marginVertical: 3 }}>
      <Divider style={{ width: 1000 }} />
    </View>
  );
  const OnPressFunc = () => {
    //id should be unique fo reach screen
    //portfolio screeen
    selectedId == "1" ? setpressfunc(console.log("navigate to settings")) : null;
    selectedId == "2" ? setpressfunc(()=>logout()) : null;
    selectedId == "3" ? setpressfunc(()=>navigation.navigate("Edit")) : null;
    //home
    selectedId == "4" ? setpressfunc(console.log("2")) : null;
    selectedId == "5" ? setpressfunc(console.log("2")) : null;
    selectedId == "6" ? setpressfunc(console.log("2")) : null;
    selectedId == "7" ? setpressfunc(console.log("2")) : null;
    selectedId == "8" ? setpressfunc(console.log("2")) : null;
    selectedId == "9" ? setpressfunc(console.log("2")) : null;
  

  };
  useEffect(() => {
    OnPressFunc();
  });
  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => setSelectedId(item.id)}
        >
          <Ionicons name={item.icon} size={24} color="black" />
          <View style={{ marginLeft: 10 }}>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
      {visibility && (
        <Card style={[styles.Card, { height: height, width: width }]}>
          <View style={styles.container}>
            <FlatList
              data={DummyData}
              renderItem={renderItem}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Card: {
    backgroundColor: "#e5e5e5",
    alignSelf: "flex-start",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
