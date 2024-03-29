import React from "react";
import { Text, View, StyleSheet } from "react-native";
//componets
import { Colors } from "../Features/Colors";
//assets
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Features/Styles";
import Checkbox from "expo-checkbox";
//features

const HomeItem = ({ name, icon, id, index, selected, onUpdateValue }) => {
  const navigation = useNavigation();
  function Handleclick() {}
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>

      <Checkbox
        value={selected}
        onValueChange={(value) => onUpdateValue(index, value, id)}
        style={styles.checkbox}
      />
    </View>
    // <TouchableOpacity style={styles.container} onPress={() => Handleclick()}>
    //   <TouchableOpacity style={styles.imagecontainer}>
    //     <Image
    //       source={icon ? icon : Nullprofile("name")}
    //       style={styles.image}
    //     />
    //   </TouchableOpacity>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //     }}
    //   >
    //     <View style={{ maxWidth: 200 }}>
    //       <NameText name={name} />
    //     </View>
    //   </View>
    //   <View style={styles.right}></View>
    // </TouchableOpacity>
  );
};

export default HomeItem;
