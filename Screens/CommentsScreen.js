import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
//components
import Nullprofile from '../Hooks/NullProfile';
import NameText from '../components/Name';
import Time from '../components/time';
import Customtextinput from '../Components2/Textinput';
//assets
import DummyNetflixIcon from '../assets/Photos/Dummyicon/Netflix.png';
import DummyTeslaIcon from '../assets/Photos/Dummyicon/Tesla.png';
import CommentItem from '../FlatlistItem/CommentItem';
//features
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;

const Netflixdata = {
  id: 1,
  name: 'Netflix CEO',
  image: DummyNetflixIcon,
  checked: true,
};

const Tesladata = {
  id: 2,
  name: 'Tesla CEO',
  image: DummyTeslaIcon,
  checked: true,
};

const Adinathdata = {
  id: 3,
  name: 'ADI',
  image: null,
  checked: false,
};

const DummyData = [
  {
    ...Tesladata,
    message:
      'WOW 👌',
    time: '1:01',
  },
  {
    ...Adinathdata,
    message: 'great idea',
    time: '1:02',
  },
  {
    ...Netflixdata,
    message: 'we are interested to supporting you',
    photo: null,
    time: '2 days',
  },

];
const HomeItem = ({ navigation, route }) => {
  const renderItem = ({ item }) => {
    return (
      <CommentItem
        message={item.message}
        photo={item.photo}
        name={item.name}
        icon={item.image}
        checked={item.checked}
        time={item.time}
        id={item.id}
      />
    );
  };
  const { message, photo, name, icon, checked, time, id } = route.params;

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.originalmessage}>
          <View style={styles.topcontainer}>
            <TouchableOpacity>
              <Image
                source={icon ? icon : Nullprofile({ name })}
                style={styles.profileicon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.namecontainer}>
              <NameText name={name} />
            </TouchableOpacity>
            <View style={styles.timecontainer}>
              <Time time={time} />
            </View>
          </View>
          <View style={styles.messagecontainer}>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
          {photo && (
            <TouchableOpacity style={styles.photocontainer}>
              <Image source={photo} style={styles.photo} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.comments}>
          <View style={{}}>
            <Text
              style={{
                borderTopColor: '#737373',
                borderBottomColor: '#737373',
                borderWidth: 0.5,
                textAlign: 'center',
                marginVertical: 10,
                fontSize: 15,
                fontWeight: 'bold',
                color: '#737373',
              }}>
              Comments
            </Text>
          </View>
          <View style={{ alignItems: 'flex-start' }}>
            <View
              style={{
                marginLeft: 20,
              }}>
              <FlatList
                data={DummyData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomcontainer}>
        <Customtextinput />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topcontainer: {
    flexDirection: 'row',
    marginVertical: 10,
    
  },
  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: deviceWidth,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
  },
  comments: {},
  originalmessage: {},
  profileicon: {
    width: 60,
    height: 60,
    borderRadius: 200,
    marginHorizontal: 5,
    borderColor: '#fff',
    borderWidth: 2,
  },
  photocontainer: {
    width: deviceWidth,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 250,
    height: 200,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 2,
    marginLeft: 10,
  },
  messagecontainer: {
    maxWidth: deviceWidth - 100,
    marginLeft: 60,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '650',
    fontStyle: 'normal',
    color: '#0f0f0f',
    letterSpacing: 1,
  },
  iconcontainer: {
    flexDirection: 'row',
    width: 340,
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
  namecontainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',

    marginTop: 10,
  },
  timecontainer: {
    width: deviceWidth / 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default HomeItem;
