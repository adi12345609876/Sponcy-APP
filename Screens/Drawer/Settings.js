import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share,
  ScrollView,
  Switch,
  Modal,
  TextInput,
  Linking,
} from "react-native";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ChangeEmail, ChangePassword, useauth } from "../../BACKEND/Auth";
import { styles } from "../../Features/Styles";
import { Colors } from "../../Features/Colors";
import { Divider } from "react-native-elements";
// import { MailComposerStatus, MailComposerOptions } from "expo-mail-composer";
import { updateEmail, updatePassword } from "firebase/auth";
import { Feedbacksender, sendEmail } from "../../Features/Utils";
import { SuperButton, SuperIcons } from "../../components/SuperComp/SuperComp";
import { UseState } from "../../Hooks/StateContext";

const CustomDrawer = () => {
  const { setLogedIn } = UseState();

  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState();
  const [Password, setPassword] = useState();
  const [Email, setEmail] = useState();
  const [Type, setType] = useState();
  const currentuser = useauth();
  const navigation = useNavigation();
  function ChangeEmailAsync() {
    try {
      ChangeEmail(currentuser, Email);
    } catch (e) {
      console.log(e);
      navigation.navigate("ReAuth");
    }
  }
  function ChangePasswordAsync() {
    try {
      ChangePassword(currentuser, Password);
    } catch (e) {
      console.log(e);
      navigation.navigate("ReAuth");
    }
  }
  function SettingsList(props) {
    return (
      <>
        <TouchableOpacity
          onPress={() => props.func()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SuperIcons name={props.icon} size={40} />
            <Text style={styles.Mediumtext}>{props.text}</Text>
          </View>
        </TouchableOpacity>
        <Divider style={{ width: 1000 }} />
      </>
    );
  }
  // function PopupModal(props) {
  //   return (
  //     <>
  //       <Modal animationType="slide" transparent={true} visible={modalVisible}>
  //         <View style={styles.centeredView}>
  //           <View style={styles.modalView}>
  //             <Text style={styles.modalText}>Hello World!</Text>
  //             <TextInput
  //               style={styles.emailInput}
  //               placeholder={Type == "email" ? "user@gmail.com" : "password123"}
  //               onChangeText={setEmail}
  //             />
  //             <TouchableOpacity
  //               style={[styles.button, styles.buttonClose]}
  //               onPress={() => setModalVisible(!modalVisible)}
  //             >
  //               <Text style={styles.textStyle}>Close</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </Modal>
  //     </>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sectionStyle}>
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            borderRadius: 10,
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <SuperIcons name="Back-Arrow" size={35} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.Mediumtext}>Settings</Text>
      </View>
      <ScrollView>
        {/* <View style={styles.centeredView}>
          <PopupModal />
        </View> */}
        <View
          style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}
        >
          {modalVisible && (
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {Type == "email" ? "Change Email" : "Change Passowrd"}
                </Text>
                <TextInput
                  style={styles.emailInput}
                  placeholder={
                    Type == "email" ? "user@gmail.com" : "password123"
                  }
                  onChangeText={Type == "email" ? setEmail : setPassword}
                />
                <SuperButton
                  text={"Done"}
                  onPress={() => {
                    Type == "email"
                      ? ChangeEmailAsync()
                      : ChangePasswordAsync();
                  }}
                />
                {/* <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          )}
          <SettingsList
            text={"Change Password"}
            func={() => {
              setModalVisible(true);
              setType("password");
            }}
            icon="lock"
          />

          <SettingsList
            text={"Change Email"}
            func={() => {
              setModalVisible(true);
              setType("email");
            }}
            icon="at"
          />
          <SettingsList
            text={"feedback"}
            func={() => Feedbacksender()}
            icon="Edit"
          />

          <View
            style={{
              alignItems: "flex-start",
              height: 100,
            }}
          >
            {/* <Text
              style={[styles.Mediumtext, { left: 0, position: "absolute" }]}
            >
              Dark Mode
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ right: 0, position: "absolute" }}
            /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;
