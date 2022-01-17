import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign,
} from '@expo/vector-icons';
//components
import Nullprofile from '../Hooks/NullProfile';
import NameText from '../components/Name';
import Time from '../components/time';
//assets

//features
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;
import { useNavigation } from '@react-navigation/native';

const HomeItem = ({ message, photo, name, icon, checked, time, id }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
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
      <View style={styles.iconcontainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Comments', {
              message,
              photo,
              name,
              icon,
              checked,
              time,
              id,
            })
          }>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 10 },
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
