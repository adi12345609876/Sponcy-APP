import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./1.Config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
initializeApp(firebaseConfig);
const auth = getAuth();

export async function signup(email, password) {
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
//3rd PARTY
//Google login
export function Glogin() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
//Github login
export function Gitlogin() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
}
//DisplayName,Slogan,icon
export async function updateUser(UserName, Photo, Slogan, currentuser) {
  if (currentuser) {
    const doclocation = doc(db, "Users", currentuser);
    const fileRef = ref(storage, "ProfilePIC/" + currentuser + ".png");

    //upload image
    const snapshot = await uploadBytes(fileRef, Photo);
    const PhotoURL = await getDownloadURL(fileRef);

    const newvalue = {
      UserName,
      PhotoURL,
      Slogan,
      uid: currentuser,
    };
    await updateDoc(doclocation, newvalue);
  }
}
//Set Username
export async function setToken(expoToken, currentuser) {
  // const Collocation = doc(db, "Users", currentuser, "Details", "EventsDoc");

  const doclocation = doc(db, "Users", currentuser);
  const doclocation2 = doc(db, "ExpoTokens", expoToken);

  const newvalue = {
    UserName: "",
    PhotoURL: "",
    Slogan: "",
    expoToken: expoToken,
  };
  //upload name
  await setDoc(doclocation, newvalue);
  // await setDoc(Collocation, {
  //   Followers: [],
  //   Following: [],
  //   Sponsorers: [],
  //   Sponsoring: [],
  // });
  await setDoc(doclocation2, {});
}
