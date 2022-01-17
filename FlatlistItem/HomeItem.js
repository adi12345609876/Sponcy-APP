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
  Octicons,
} from '@expo/vector-icons';
//componets
import Nullprofile from '../Hooks/NullProfile';
import Notificationbutton from '../components/NotificationButton';
import NameText from '../components/Name';
//assets

//features

const HomeItem = ({ name, previousmessage, pinned, icon, notifications }) => (
  <TouchableOpacity
    style={styles.container}>
    <TouchableOpacity style={styles.imagecontainer}>
      <Image
        source={icon ? icon : Nullprofile({ name })}
        style={styles.image}
      />
    </TouchableOpacity>
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View style={{ maxWidth: 200 }}>
        <NameText name={name} />
        <Text numberOfLines={1} style={styles.previousmessage}>
          {previousmessage}
        </Text>
      </View>
    </View>
    <View style={styles.right}>
      <View style={[styles.end, { paddingRight: 5 }]}>
        <Notificationbutton number={notifications} />
      </View>
      <View style={styles.end}>
        {pinned && <Octicons name="pin" size={15} color="#737373" />}
      </View>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  container:{
      flexDirection: 'row',
      marginVertical: 10,
      marginHorizontal: 5,
    },
  imagecontainer: {
    justifyContent: 'flex-end',
    borderRadius: 10,
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginHorizontal: 1,
    borderRadius: 200,
    borderColor:"#fff",
    borderWidth:2,
  },
  end: { justifyContent: 'flex-end' },
  right: {
    flexDirection: 'row',
    position: 'absolute',
    right: 3,
    bottom: 0,
  },
  previousmessage: {
    fontFamily: 'Red Hat Display',
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#0000004D',
  },
});
export default HomeItem;
