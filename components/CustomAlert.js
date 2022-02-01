//how to use this
// <CustomAlert visible={modalVisible} alerttext="This is an alert button" height={150}/>
// const [modalVisible, setModalVisible] = useState(false);
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Box,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Divider } from 'react-native-elements';

import { BlurView } from 'expo-blur';
let deviceWidth = Dimensions.get('screen').width;
let deviceHeight = Dimensions.get('screen').height;
import {Colors} from "../Features/Features"
export default function CustomBox({ visible, alerttext, height }) {


  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
       >
        <View style={styles.centeredView}>
          <BlurView intensity={70} tint="light" style={styles.blurContainer}>
            <View style={[styles.Box, { height: height ? height : 150 }]}>
              <View>
                <Text style={styles.alerttext}>{alerttext}</Text>
              </View>
              <View
                style={{
                  top: height / 2.14285714286,
                }}>
                <Divider />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexShrink: 1,
                    // backgroundColor:"pink",
                    // top:50,
                    // bottom: -60,
                  }}>
                  <TouchableOpacity>
                    <Text style={{ color: Colors.grey }}>Cancel</Text>
                  </TouchableOpacity>

                  <Divider orientation="vertical" />
                  <TouchableOpacity>
                    <Text style={{ color: Colors.primary }}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  alerttext: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.black,
  },
  blurContainer: {
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box: {
    margin: 20,
    backgroundColor: Colors.white,
    // justifyContent: 'center',
    // alignItems:"center",
    width: deviceWidth / 1.5,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 22,
  },
});
