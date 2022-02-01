import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAOlqVZ6K9LN0M90X2HJYd0aWZUH587xh4",
  authDomain: "sponcy-7003f.firebaseapp.com",
  projectId: "sponcy-7003f",
  storageBucket: "sponcy-7003f.appspot.com",
  messagingSenderId: "903091214185",
  appId: "1:903091214185:web:3aff3eaff8a02388080ff8",
  measurementId: "G-GHK76TVN8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
export const db = getFirestore();
//AUTH
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function logout() {
  return signOut(auth);
}
export function useauth() {
  const [currentuser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);
  return currentuser;
}
//STORAGE
// export async function upload(file, Name, currentUser, setdone) {
//   //location
//   const fileRef = ref(storage, "ProfilePIC/" + currentUser.uid + ".png");
//   //upload
//   setdone(true);
//   const snapshot = await uploadBytes(fileRef, file);
//   //update currentuser.photoURL with download url
//   const userphotoURL = await getDownloadURL(fileRef);

//   updateProfile(currentUser, {
//     displayName: Name,
//     photoURL: userphotoURL,
//   });
//   setdone(false);
//   alert("Uploaded");
// }

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
//getPostted User
