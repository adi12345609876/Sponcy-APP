import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  QuerySnapshot,
  refEqual,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useauth } from "./Auth";
import uuid from "react-native-uuid";

const storage = getStorage();
export const db = getFirestore();

//FIRESTORE

//get currentUser
export function UserData() {
  const currentuser = useauth();
  const [curUsers, setcurUsers] = useState();
  useEffect(() => {
    if (currentuser) {
      const doclocation = doc(db, "Users", currentuser?.uid);
      onSnapshot(doclocation, (snapshot) => {
        setcurUsers({
          ...snapshot.data(),
          id: currentuser?.uid,
        });
      });
    }
  }, [currentuser]);
  return { array: curUsers };
}
//SetUser
export async function setUser(uid) {
  const doclocation = doc(db, "Users", uid);
  const newvalue = {
    UserName: "",
    PhotoURL:
      "https://firebasestorage.googleapis.com/v0/b/sponcy-7003f.appspot.com/o/Person.png?alt=media&token=79018f26-8263-4230-8713-97c68a845570.png",
    Slogan: "",
    Followers: 0,
    Following: 0,
    Sponsoring: 0,
    Status: "",
    checked: false,
    uid: uid,
  };
  await setDoc(doclocation, newvalue);
  console.log("DONE");
}
//updateUser
export async function updateUser(
  UserName,
  Photo,
  Slogan,
  currentUser,
  setdone
) {
  const nullPhoto =
    "https://firebasestorage.googleapis.com/v0/b/sponcy-7003f.appspot.com/o/Person.png?alt=media&token=79018f26-8263-4230-8713-97c68a845570.png";
  const doclocation = doc(db, "Users", currentUser?.uid);
  const fileRef = ref(storage, "ProfilePIC/" + currentUser?.uid + ".png");

  setdone(true);
  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const PhotoURL = await getDownloadURL(fileRef);

  const newvalue = {
    UserName,
    PhotoURL,
    Slogan,
    uid: currentUser?.uid,
  };
  //upload name
  await updateDoc(doclocation, newvalue);
  setdone(false);
  console.log(getDoc(doclocation));
}

//getAnnnounce
export function Announces() {
  const [Announce, setAnnounce] = useState();
  const Collocation = collection(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message"
  );
  useEffect(() => {
    onSnapshot(Collocation, (snapshot) => {
      setAnnounce(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);
  return Announce;
}
//Post Message
export async function PostAnnounce(Photo, message, currentuser, setdone) {
  const doclocation = collection(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message"
  );
  const fileRef = ref(storage, "AnnouncePIC/" + uuid.v4() + ".png");
  setdone(true);
  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const PhotoURL = await (Photo ? getDownloadURL(fileRef) : null);

  const newvalue = {
    PhotoURL,
    message,
    currentuser,
    // time: serverTimestamp(),
  };
  //upload name
  await addDoc(doclocation, newvalue);
  setdone(false);
}
//get chat rooms
export function ChatRooms() {
  const currentuser = useauth();
  const [Rooms, setRooms] = useState();
  const Collocation = collection(db, "Private-Chat");

  useEffect(() => {
    if (currentuser) {
      console.log(currentuser?.uid);
      const q = query(
        Collocation,
        where("Participants", "array-contains", currentuser?.uid)
      );
      onSnapshot(q, (snapshot) => {
        setRooms(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [currentuser]);
  return Rooms;
}
//get private messages
export function PrivateChats(roomid) {
  const [PrivateChats, setPrivateChats] = useState();
  const Collocation = collection(db, "Private-Chat", roomid, "Messages");
  useEffect(() => {
    onSnapshot(Collocation, (snapshot) => {
      setPrivateChats(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);
  return PrivateChats;
}
//Post Private messages
export async function PostPrivateChats(roomid, From, text) {
  const Collocation = collection(db, "Private-Chat", roomid, "Messages");

  // const fileRef = ref(storage, "AnnouncePIC/" + uuid.v4() + ".png");

  // //upload image
  // const snapshot = await uploadBytes(fileRef, Photo);
  // const PhotoURL = await (Photo ? getDownloadURL(fileRef) : null);

  // const newvalue = {
  //   PhotoURL,
  //   message,
  //   currentuser,
  //   // time: serverTimestamp(),
  // };
  const newvalue = {
    From,
    text,
  };
  await addDoc(Collocation, newvalue);
}
//Add Rooms
export async function AddRooms(Photo, RoomName, Participants, useruid) {
  const doclocation = collection(db, "Private-Chat");

  const newvalue = {
    LastMessage: "",
    // Participants: [Participants, useruid],
    Participants: Participants,
    RoomName,
    icon: "",
    notifications: "",

    // time: serverTimestamp(),
  };
  //upload name
  const room = await addDoc(doclocation, newvalue);
  const uploadPhoto = await Addroomphoto(Photo, room.id);
}
export async function Addroomphoto(Photo, docid) {
  const doclocation = doc(db, "Private-Chat", docid);
  const fileRef = ref(storage, "Roomsicon/" + docid + ".png");

  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const icon = await (Photo ? getDownloadURL(fileRef) : null);
  const newvalue = {
    icon,
  };
  await updateDoc(doclocation, newvalue);
}
//Delete Rooms
export async function DeleteRoom(docid) {
  const doclocation = doc(db, "Private-Chat", docid);
  await deleteDoc(doclocation);
  console.log("Deleted Room" + docid);
}
//EdiRooms
export async function EditRoom(docid, RoomName, icon, Participants, useruid) {
  const doclocation = doc(db, "Private-Chat", docid);
  const newvalue = {
    RoomName,
    Participants: [Participants, useruid],
    icon,
  };
  updateDoc(doclocation, newvalue);
  console.log("Updated Room" + docid);
}
//get All Users
export function Usersforchat() {
  const [Users, setUsers] = useState();
  const Collocation = collection(db, "Users");
  // const q = query(Collocation, where("", "!=", currentuser?.uid));
  useEffect(() => {
    onSnapshot(Collocation, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);
  return Users;
}
//update with useeffect
export function updatedb() {
  const [Chats, setChats] = useState();
  const [id, setid] = useState();

  const Collocation = collection(db, "Users");

  useEffect(() => {
    onSnapshot(Collocation, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
        }))
      );
    });
  }, []);
  // useEffect(() => {
  //   onSnapshot(Collocation, (snapshot) => {
  //     setChats(
  //       snapshot.forEach((doc) => ({
  //         id: doc.id,
  //       }))
  //     );
  //   });
  // }, [Chats]);

  // return Chats;
}
