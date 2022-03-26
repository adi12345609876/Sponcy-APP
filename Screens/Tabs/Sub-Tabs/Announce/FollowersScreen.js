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
import AnimatedScroolView from "../../../../components/Animation/AnimatedScroolTab";
import Nullprofile from "../../../../Hooks/NullProfile";
import Name from "../../../../components/SuperComp/Name";
import { Colors } from "../../../../Features/Features";

let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;

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
export default function AssetExample({ route }) {
  const [data, setdata] = useState(userdetails);
  const { userdetails } = route.params;
  useEffect(() => {
    console.log("d", data);
  }, [userdetails]);

  return (
    <AnimatedScroolView>
      <View style={styles.container}>
        {/* <FlatList
          data={item.data}
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
              onPress={() => navigation.navigate("Portfolio")}
            >
              <Image
                style={styles.image}
                source={item.image ? item.image : DummynullProfile}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        /> */}
      </View>
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
