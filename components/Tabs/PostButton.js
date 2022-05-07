// import React from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Animated,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { Colors } from "../../Features/Colors";
// const { width } = Dimensions.get("screen");

// let deviceWidth = Dimensions.get("screen").width;
// let CIRCLERADIUS = 250;
// import { useTabBar } from "../../Hooks/TabBarprovider";
// import { useNavigation } from "@react-navigation/native";
// export default function PostButton() {
//   const navigation = useNavigation();

//   const animation = React.useRef(new Animated.Value(0)).current;
//   const [showSubbutton, setshowSubbutton] = React.useState(false);
//   const toggleTabBarAnimation = () => {
//     if (showSubbutton) {
//       Animated.timing(animation, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       Animated.timing(animation, {
//         toValue: 300,
//         duration: 200,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   React.useEffect(() => {
//     toggleTabBarAnimation();
//   }, [showSubbutton]);

//   function handlepress() {
//     navigation.navigate("Post");
//   }
//   return (
//     <View style={[styles.container]}>
//       <TouchableOpacity
//         style={{ backgroundColor: "green" }}
//         onPress={() => console.log("VJHDASVDGJDFGSD")}
//       >
//         <Animated.View
//           style={[
//             styles.center,
//             { backgroundColor: "red", opacity: animation },
//           ]}
//         >
//           <Feather name="plus" size={30} color="white" />
//         </Animated.View>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.button]}
//         onPress={() => setshowSubbutton(!showSubbutton)}
//       >
//         <View style={[styles.center, {}]}>
//           <Feather name="plus" size={30} color="white" />
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     justifyContent: "center",
//     left: deviceWidth / 2 - 18,
//     bottom: 20,
//   },

//   button: {
//     backgroundColor: Colors.primary,
//     width: 60,
//     height: 60,
//     borderRadius: CIRCLERADIUS,
//     elevation: 5,
//     padding: 15,
//     borderColor: Colors.white,
//     borderWidth: 1,
//   },
// });
import * as React from "react";
import { FAB, Portal, Provider } from "react-native-paper";
import { deviceWidth } from "../../Features/Styles";

const MyComponent = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "calendar-today" : "plus"}
          actions={[
            { icon: "plus", onPress: () => console.log("Pressed add") },
            {
              icon: "star",
              label: "Star",
              onPress: () => console.log("Pressed star"),
            },
            {
              icon: "email",
              label: "Email",
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "bell",
              label: "Remind",
              onPress: () => console.log("Pressed notifications"),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          style={{
            position: "absolute",
            // margin: 16,
            right: deviceWidth / 2,
            bottom: 5,
          }}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default MyComponent;
