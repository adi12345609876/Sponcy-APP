import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";
export const deviceWidth = Dimensions.get("screen").width;
export const deviceHeight = Dimensions.get("screen").height;
export const StatusBar_Height = Constants.statusBarHeight;
import Constants from "expo-constants";
import { announce_image_size } from "./GlobalConsts";

export const styles = StyleSheet.create({
  //container
  Postcontainer: {
    paddingTop: Constants.statusBarHeight + 15,
  },
  iOSBackdrop: {
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: "#232f34",
    opacity: 0.32,
  },
  timecontainer: {
    position: "absolute",
    right: 10,
  },
  titleContainer: {
    marginVertical: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: deviceWidth,
    position: "absolute",
    bottom: 0,
    // backgroundColor: "red",
  },

  messagecontainer: {
    maxWidth: deviceWidth - 100,
    marginLeft: 60,
    marginBottom: 3,
    justifyContent: "center",
    textAlign: "center",
  },
  photocontainer: {
    width: deviceWidth / 2 + 20,
    alignItems: "flex-start",
    marginLeft: 45,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
  },
  imagecontainer: {
    justifyContent: "flex-end",
    borderRadius: 10,
    marginRight: 10,
  },

  container1: {
    flex: 1,
    backgroundColor: Colors.white,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // maxWidth: deviceWidth,
    // paddingTop: 40,
  },

  announcecontainer: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: deviceWidth,
    // marginBottom: 10,
  },
  homecontainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
  },

  ceneteredcontainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  topcontainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  namecontainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
  },
  Peoplecontainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.white,
  },
  headercontainer: {
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    width: "100%",
    height: 90,
    elevation: 2,
  },
  container: {
    margin: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    flex: 1,
  },
  UsersHomecontainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  //text
  Bigtext: {
    fontSize: 25,
    fontWeight: "bold",
    // textAlign: "center",
    color: Colors.black,
  },
  Mediumtext: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.black,
  },
  Smalltext: {
    fontSize: 15,
    fontWeight: "normal",
    textAlign: "center",
    color: Colors.black,
    fontFamily: "sans-serif",
  },
  Searchbox: {
    borderRadius: 10,
    backgroundColor: Colors.lightgrey,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightgrey,
    borderWidth: 0.5,
    elevation: 2,
  },

  logo: {
    height: 15,
    width: 15,
    marginLeft: 1,
    marginTop: 9,
  },

  textInputStyle: {
    maxHeight: 100,
    width: "60%",
    borderRadius: 10,
    // alignSelf: 'center',
    // justifyContent: 'center',
    fontSize: 15,
    fontWeight: "400",
  },

  sectionStyle: {
    maxWidth: deviceWidth - 10,
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
  Card: {
    backgroundColor: Colors.lightgrey,
    alignSelf: "flex-start",
    zIndex: 1,
    elevation: 20,
  },
  recent: {
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: "grey",
    width: "100%",
    alignItems: "flex-end",
    maxWidth: deviceWidth,
  },

  Searchinput: {
    width: "80%",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 10,
    maxWidth: deviceWidth,
  },

  //1

  peopleimage: {
    width: 70,
    height: 70,
    borderRadius: 200,
    borderColor: Colors.white,
    borderWidth: 2,
  },

  //3

  //createroom

  input: {
    maxHeight: 200,
    height: 200,
    textAlignVertical: "top",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  //editroom

  submitbutton: {
    backgroundColor: Colors.primary,
    width: 140,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },

  //ChatScreen

  //FollowersSCren

  title: {
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
  },

  //CommentsScreen
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  comments: {},
  originalmessage: {},

  photo: {
    width: announce_image_size * 5,
    height: announce_image_size * 4,
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 2,
    // elevation: 2,
    marginLeft: 10,
  },
  containerphoto: {
    // width: deviceWidth - 100,
    // height: deviceHeight / 2,
    borderRadius: 5,
    borderWidth: 2,
    width: 300,
    height: 300,
    marginBottom: 50,
  },

  message: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "900",
    fontStyle: "normal",
    color: Colors.black,
  },

  //verifySscreen

  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  //SignIn
  circlestyle1: {
    width: 395,
    height: 359,
    borderRadius: 600,
    right: 150,
    bottom: 120,
  },
  circlestyle2: {
    width: 395,
    height: 359,
    borderRadius: 600,
    left: 200,
    top: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  signINStyle: {
    //done
    textAlign: "center",
    fontSize: deviceWidth / 8,
    fontWeight: "700",
    fontStyle: "normal",
    marginTop: 20,

    color: Colors.black,
  },
  emailtext: {
    //done
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    color: "black",
    padding: 5,
  },

  emailInput: {
    borderRadius: 10,
    backgroundColor: "white",
    // borderStyle: "solid",
    // borderWidth: 3,
    borderColor: "black",
    marginLeft: 3,
    marginRight: 3,
    width: "90%",
    justifyContent: "center",
    padding: 15,
    elevation: 20,
    shadowColor: Colors.grey,
  },

  // or: {
  //   //done
  //   textAlign: "center",
  //   fontFamily: "Roboto",
  //   color: Colors.grey,
  // },
  signinbutton: {
    width: deviceWidth,
    height: 50,
    borderRadius: 17,
    backgroundColor: Colors.primary,
  },
  signinbuttonText: {
    // width: 275,
    // height: 46,
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 5,
  },
  createbutton: {
    width: "90%",
    height: 70,
    borderRadius: 15,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  createtext: {
    marginRight: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: Colors.white,
  },
  createbuttontext: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "700",
    // fontStyle: "normal",
    // textAlign: "center",
    //textAlignVertical:"center"
    // padding: 10,
    color: Colors.white,
  },
  alreadyhave: {
    fontFamily: "Roboto",
    fontSize: 15,
    padding: 10,
  },
  //////Item
  //userHome

  end: { justifyContent: "flex-end" },
  right: {
    flexDirection: "row",
    position: "absolute",
    right: 3,
    bottom: 0,
  },
  previousmessage: {
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    color: Colors.black,
  },
  //participants

  end: { justifyContent: "flex-end" },
  right: {
    flexDirection: "row",
    position: "absolute",
    right: 3,
    bottom: 0,
  },

  //Notify
  end: { justifyContent: "flex-end" },
  row: { flexDirection: "row" },

  tripledot: {
    color: Colors.grey,
    marginBottom: 10,
  },
  time: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: Colors.grey,
  },
  logo: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  leftView: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  leftViewCenter: {
    flexDirection: "row",
    position: "absolute",
    right: 3,
    bottom: 5,
  },
  //Home]

  image: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginHorizontal: 1,
    borderRadius: 200,
    borderColor: Colors.black,
    borderWidth: 2,
  },
  end: { justifyContent: "flex-end" },
  right: {
    flexDirection: "row",
    position: "absolute",
    right: 3,
    bottom: 0,
  },

  //comments

  //chatitem
  sending: {
    padding: 18,
    backgroundColor: Colors.white,
    alignSelf: "flex-end",
    borderBottomColor: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    borderTopRightRadius: 0,
    marginTop: 12,
  },
  reciving: {
    padding: 18,
    backgroundColor: Colors.tertiary,
    alignSelf: "flex-start",
    margin: 15,
    maxWidth: "80%",
    position: "relative",
    borderRadius: 20,
    borderTopLeftRadius: 0,
  },
  text: {
    // width: 160,
    // height: 20,
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    color: Colors.black,
    textAlign: "center",
  },
  itemText: {
    flexWrap: "wrap",
    fontSize: 20,
    paddingRight: 5,
    fontWeight: "700",
    color: Colors.black,
    flexShrink: 1,
  },
  time: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: Colors.grey,
    fontWeight: "600",
  },

  Lottieheart: {
    width: 55,
    height: 55,

    position: "absolute",
    top: -5,
  },
  iconcontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});
