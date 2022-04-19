import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, View, Image } from "react-native";

import { StyleSheet, TouchableOpacity, Text } from "react-native";
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
              source={props.image}
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

export default class SocialIcon extends React.Component {
  render() {
    const { name, color, ...props } = this.props;

    return (
      <FontAwesome {...props} color={color || SocilaColors[name]} name={name} />
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    maxHeight: 100,
    width: "60%",
    borderRadius: 10,
    // alignSelf: 'center',
    // justifyContent: 'center',
    fontSize: 15,
    fontWeight: "400",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.tertiary,
    width: "100%",
  },
  sectionStyle: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 10,
    margin: 10,
    maxHeight: 100,
    alignSelf: "flex-start",
  },
});
