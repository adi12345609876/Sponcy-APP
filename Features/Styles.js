import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";
let deviceWidth = Dimensions.get("screen").width;
let deviceHeight = Dimensions.get("screen").height;
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  //container
  Postcontainer: {
    paddingTop: Constants.statusBarHeight + 15,
  },
  timecontainer: {
    width: deviceWidth / 2,
    justifyContent: "center",
    alignItems: "flex-end",
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
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  photocontainer: {
    width: deviceWidth,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imagecontainer: {
    justifyContent: "flex-end",
    borderRadius: 10,
    marginRight: 10,
  },
  iconcontainer: {
    flexDirection: "row",
    width: 340,
    justifyContent: "space-evenly",
    marginVertical: 30,
  },

  container1: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxWidth: deviceWidth,
    paddingTop: 40,
  },

  announcecontainer: {
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
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
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
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
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.black,
  },
  Searchbox: {
    borderRadius: 10,
    backgroundColor: Colors.grey,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.black,
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
    backgroundColor: Colors.tertiary,
    alignSelf: "flex-start",
    zIndex: 1,
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

  submitbutton: {
    backgroundColor: Colors.primary,
    width: 140,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  input: {
    maxHeight: 200,
    height: 200,
    textAlignVertical: "top",
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },

  peopleimage: {
    width: 70,
    height: 70,
    borderRadius: 200,
    borderColor: Colors.white,
    borderWidth: 2,
  },

  //3

  //createroom

  submitbutton: {
    backgroundColor: Colors.primary,
    width: 140,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
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

  comments: {},
  originalmessage: {},
  profileicon: {
    width: 60,
    height: 60,
    borderRadius: 200,
    marginHorizontal: 5,
    borderColor: Colors.white,
    borderWidth: 2,
  },

  photo: {
    width: 250,
    height: 200,
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 2,
    // elevation: 2,
    marginLeft: 10,
  },

  message: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "normal",
    color: Colors.black,
    letterSpacing: 1,
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
  signINStyle: {
    //done
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: deviceWidth / 5,
    fontWeight: "700",
    fontStyle: "normal",
    padding: 5,
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
    borderRadius: 28,
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 3,
    marginRight: 3,
    width: "100%",
    justifyContent: "center",
    padding: 15,
  },

  or: {
    //done
    textAlign: "center",
    fontFamily: "Roboto",
    color: Colors.grey,
  },
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
    width: 150,
    height: 70,
    borderRadius: 23,
    backgroundColor: Colors.black,
  },
  createbuttontext: {
    fontFamily: "Roboto",
    fontSize: 25,
    fontWeight: "700",
    fontStyle: "normal",
    textAlign: "center",
    //textAlignVertical:"center"
    padding: 10,
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
    fontFamily: "Red Hat Display",
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
    borderColor: Colors.white,
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

  profileicon: {
    width: 60,
    height: 60,
    borderRadius: 200,
    marginHorizontal: 5,
    borderColor: Colors.white,
    borderWidth: 2,
  },

  photo: {
    width: 250,
    height: 200,
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 2,
    // elevation: 2,
    marginLeft: 10,
  },

  message: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "normal",
    color: Colors.black,
    letterSpacing: 1,
  },

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
  //Announce

  profileicon: {
    width: 60,
    height: 60,
    borderRadius: 200,
    marginHorizontal: 5,
    borderColor: Colors.white,
    borderWidth: 2,
  },

  photo: {
    width: 250,
    height: 200,
    borderRadius: 20,
    borderColor: Colors.white,
    borderWidth: 2,
    // elevation: 2,
    marginLeft: 10,
  },

  message: {
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "normal",
    color: Colors.black,
    letterSpacing: 1,
  },
});
