import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import ChatItem from "../../FlatlistItem/ChatItem";
import image from "../../assets/Photos/BGC.png";
import { Colors } from "../../Features/Features";

const renderItem = ({ item }) => {
  return <ChatItem message={item.text} From={item.From} time={item.time} />;
};
export default function App({ messages }) {
  const [text, setText] = React.useState();

  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}
//  <View style={styles.sending}>
//         <Text style={styles.text}>{text}</Text>
//       </View>
//       <View style={styles.reciving}>
//         <Text style={styles.text}>{text}</Text>
//       </View>
const styles = StyleSheet.create({
  sending: {
    padding: 15,
    backgroundColor: Colors.white,
    alignSelf: "flex-end",
    borderBottomColor: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    borderTopRightRadius: 0,
    marginTop: 12,
  },
  reciving: {
    padding: 15,
    backgroundColor: Colors.tertiary,
    alignSelf: "flex-start",
    margin: 15,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  text: {
    // width: 160,
    // height: 20,
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    color: Colors.black,
    textAlign: "center",
  },
  image: {},
});
