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
export async function upload(file, currentUser) {
  //location
  const fileRef = ref(storage, "ProfilePIC/"+currentUser.uid + ".png");
  //upload
  const snapshot = await uploadBytes(fileRef, file);
  //update currentuser.photoURL with download url
  const userphotoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, { photoURL: userphotoURL });
  alert("Uploaded");

  
}
