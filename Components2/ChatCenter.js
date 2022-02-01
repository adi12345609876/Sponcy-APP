import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import ChatItem from '../FlatlistItem/ChatItem';
import image from '../assets/Photos/BGC.png';
import { Colors } from '../Features/Features';

const DummyData = [
  {
    From: 'Adinath',
    To: 'Netflix',
    message:
      'From Adinth,It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    time: '12:01pm',
  },
  {
    From: 'Adinath',
    To: 'Netflix',
    message:
      'From Adinth,It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    time: '12:01pm',
  },
  {
    From: 'Netflix',
    To: 'Adinath',
    message:
      'From Netflix,It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    time: '1:00pm',
  },
  {
    From: 'Netflix',
    To: 'Adinath',
    message:
      'From Netflix,It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    time: '1:00pm',
  },
];
const renderItem = ({ item }) => {
  return (
    <ChatItem
      message={item.message}
      From={item.From}
      To={item.To}
      time={item.time}
    />
  );
};
export default function App() {
  const [text, setText] = React.useState();

  return (
    <ScrollView style={{ marginBottom: 50 }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <FlatList
          data={DummyData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </ImageBackground>
    </ScrollView>
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
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
