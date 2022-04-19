import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
//components
import NameText from "../components/SuperComp/Name";
import Time from "../components/SuperComp/time";
//assets
import { styles } from "../Features/Styles";

//features

const HomeItem = ({ message, photo, name, icon, time, id, user }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 50 }}>
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() =>
          navigation.navigate("Portfolio", {
            useruid: user,
          })
        }
      >
        <View>
          <Image source={{ uri: icon }} style={styles.profileicon} />
        </View>
        <View style={styles.Peoplecontainer}>
          <NameText name={name} icon={icon} />
          <View style={styles.timecontainer}>
            <Time time={time} />
          </View>
        </View>
      </TouchableOpacity>

      {photo && (
        <TouchableOpacity style={styles.photocontainer}>
          <Image source={{ uri: photo }} style={styles.photo} />
        </TouchableOpacity>
      )}
      {message && (
        <View style={styles.messagecontainer}>
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
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
