import React from "react";
import { Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export const SuperView = () => {
  <View>{children}</View>;
};

export const SuperText = () => {
    <View>
        <Text>

        {children}
        </Text>
    </View>;
};
export const SuperModalView = () => {
    <View>
      <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
    </View>;
};
