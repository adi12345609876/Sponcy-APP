import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-paper";
//components
import NameText from "../components/SuperComp/Name";
import Time from "../components/SuperComp/time";
import { Colors } from "../Features/Colors";
//assets
import { styles } from "../Features/Styles";

//features
let deviceWidth = Dimensions.get("screen").width;

const HomeItem = ({ message, photo, name, icon, time, id, user }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginBottom: 40,
        width: deviceWidth,
      }}
    >
      <View style={styles.container}>
        <Avatar.Image
          size={50}
          source={{ uri: icon ? icon : null }}
          style={{ backgroundColor: "grey" }}
        />

        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            navigation.navigate("Portfolio", {
              useruid: user,
            })
          }
        >
          <View style={styles.namecontainer}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: Colors.black,
                textAlign: "center",
                marginLeft: 10,
              }}
            >
              {name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.timecontainer}>
        <Time time={time} />
      </View>

      <View style={styles.messagecontainer}>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
      {photo && (
        <TouchableOpacity style={styles.photocontainer}>
          <Image source={{ uri: photo ? photo : null }} style={styles.photo} />
        </TouchableOpacity>
      )}
      {/* <View style={styles.iconcontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Comments", {
              message,
              photo,
              name,
              icon,
              checked,
              time,
              id,
            })
          }
        >
          <MaterialCommunityIcons
            name="message-reply-text"
            size={15}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="hearto" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="retweet" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name="share" size={15} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default HomeItem;
