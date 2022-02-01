import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Ionicons,
  EvilIcons,
} from '@expo/vector-icons';
import { Divider } from 'react-native-elements';
import AnimatedScroolView from '../components/AnimatedScroolTab';
import CheckCircle from '../assets/Photos/icons/CheckCircle.png';
import ThumbsUp from '../assets/Photos/icons/ThumbsUp.png';
import ThumbsDown from '../assets/Photos/icons/ThumbsDown.png';
import { Colors } from '../Features/Features';
import Name from '../components/Name';
import Netflixicon from '../assets/Photos/Dummyicon/Netflix.png';
export default function ChatHeader() {
  return (
    <View style={styles.headercontainer}>
      <View style={{ top: 10, flexDirection: 'row' }}>
        <TouchableOpacity style={{ justifyContent: 'center' }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 10 }}>
          <Image source={Netflixicon} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Name name={'Netflix'} />
            <Image style={styles.logo} source={CheckCircle} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ top: 10 }}>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headercontainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    width: '100%',
    height: 90,
    elevation: 2,
  },

  logo: {
    height: 15,
    width: 15,
    marginLeft: 1,
    marginTop: 9,
  },
});
