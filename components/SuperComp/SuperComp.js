import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, View, Image } from "react-native";

import { TouchableOpacity, Text } from "react-native";
import { Colors, SocilaColors } from "../../Features/Colors";

export function SuperButton(props) {
  //props:onPress,loading,buttonstyle,imagestyle,textstyle
  return (
    <TouchableOpacity
      style={
        props.buttonstyle
          ? props.buttonstyle
          : {
              backgroundColor:
                props.loading || props.disabled ? Colors.grey : Colors.primary,
              height: 50,
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }
      }
      onPress={props.onPress}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          {props.image && (
            <Image
              source={props.image ? props.image : null}
              style={
                props.imagestyle
                  ? props.imagestyle
                  : { height: 35, width: 35, marginRight: 5 }
              }
            />
          )}
          {props.text && (
            <Text
              style={
                props.textstyle
                  ? props.textstyle
                  : {
                      fontWeight: "bold",
                      fontSize: 20,
                      color: Colors.white,
                      textAlign: "center",
                    }
              }
            >
              {props.text}
            </Text>
          )}

          {props.children ? props.children : null}
        </>
      )}
    </TouchableOpacity>
  );
}
export function SuperContainerImage(props) {
  //props:
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            ></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default class SocialIcon extends React.Component {
  render() {
    const { name, color, onPress, ...props } = this.props;

    return (
      <TouchableOpacity onPress={() => onPress()}>
        <FontAwesome
          {...props}
          color={color || SocilaColors[name]}
          name={name}
        />
      </TouchableOpacity>
    );
  }
}
