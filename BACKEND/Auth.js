import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  updateEmail,
  deleteUser,
  updatePassword,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./1.Config";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ShowAlert, showtoast } from "../Features/Utils";

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  // Initialize other firebase products here
}

export const auth = getAuth();

export async function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function logout() {
  ShowAlert("Sure to Logout", "Don't worry you can login again", () => {
    signOut(auth);
  });
}
export function useauth() {
  const [currentuser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
      }
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
//DisplayName,Bio,icon
export async function updateUser(
  UserName,
  Photo,
  Bio,
  work,
  currentuser,
  IsDocsExist
) {
  const doclocation = doc(db, "Users", currentuser?.uid);
  const fileRef = ref(storage, "ProfilePIC/" + currentuser?.uid + ".png");

  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const PhotoURL = await getDownloadURL(fileRef);
  const Biodata = Bio ? Bio : null;
  const Work = work ? work : null;

  await updateProfile(currentuser, {
    displayName: UserName,
    photoURL: PhotoURL,
  });
  if (IsDocsExist) {
    await updateDoc(doclocation, {
      UserName,
      PhotoURL,
      Biodata,
      Work,
      uid: currentuser?.uid,
    });
  } else {
    await setDoc(doclocation, {
      UserName,
      PhotoURL,
      Biodata,
      Work,
    });
  }
}
//Set Username
export async function setToken(expoToken, currentuser) {
  try {
    const doclocation = doc(db, "Users", currentuser);
    const doclocation2 = doc(db, "ExpoTokens", expoToken);
    //upload name
    await setDoc(doclocation, {
      UserName: "",
      PhotoURL: "",
      Biodata: "",
      expoToken: expoToken,
    });

    await setDoc(doclocation2, {});
  } catch (error) {
    console.log(error);
  }
}
export async function ChangeEmail(currentuser, newEmail) {
  await updateEmail(currentuser, newEmail);
  showtoast("Email Changed");
}
export async function ChangePassword(currentuser, newPassword) {
  updatePassword(currentuser, newPassword);
  showtoast("Password Changed");
  // await sendPasswordResetEmail(currentuser, currentuser?.email);
}

export async function SendFeedBack(params) {
  await deleteUser(currentuser);
}
