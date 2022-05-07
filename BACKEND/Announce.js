import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useauth } from "./Auth";
import uuid from "react-native-uuid";
import { db, storage } from "./firebase";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./1.Config";
if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  // Initialize other firebase products here
}

//Get Announce
export function Announces() {
  const [Announce, setAnnounce] = useState();
  const Collocation = collection(db, "Announce");
  useEffect(() => {
    const q = query(Collocation, orderBy("time", "desc"));
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setAnnounce(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }
    });
  }, []);

  return Announce;
}
//Get Comments
export function getComments(docid) {
  const [Comments, setComments] = useState();
  const Collocation = collection(db, "Announce", docid, "Comments");
  const q = query(Collocation, orderBy("time"));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);
  return Comments;
}
//Get currentuser
export function currentuserReplies(useruid) {
  const currentuser = useauth();
  const [CurrentUserComments, setCurrentUserComments] = useState();

  useEffect(() => {
    if (useruid) {
      const q = query(
        collectionGroup(db, "Comments"),
        where("user", "==", useruid),
        orderBy("time")
      );

      onSnapshot(q, (snapshot) => {
        setCurrentUserComments(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [currentuser]);

  return CurrentUserComments;
}
//Get Followers and Following
export async function getUserDetailsCollection(otheruser) {
  const [Comments, setComments] = useState();

  useEffect(() => {
    if (otheruser) {
      const Doclocation_array = doc(db, "Users", otheruser);
      onSnapshot(Doclocation_array, (snap) => {
        setComments(snap.data());
      });
    }
  }, [otheruser]);

  return Comments;
}
//Like
export async function Likemessage(currentuser, messageid) {
  updateDoc(doc(db, "Announce", messageid), {
    LikedUser: arrayUnion(currentuser),
  });
}
//Unlike
export async function Dislikemessage(currentuser, messageid) {
  updateDoc(doc(db, "Announce", messageid), {
    LikedUser: arrayRemove(currentuser),
  });
}
//Follow
export async function FollowUser(currentuser, otheruser) {
  const Doclocation = doc(db, "Users", otheruser);
  const Doccurrentuser = doc(db, "Users", currentuser);
  //for otheruser
  await updateDoc(Doclocation, {
    Followers: arrayUnion(currentuser),
  });
  //for currentuser
  await updateDoc(Doccurrentuser, {
    Following: arrayUnion(otheruser),
  });
}
// export async function SponsorUser(currentuser, otheruser) {
//   //const [Comments, setComments] = useState();

//   const Doclocation_array = doc(db, "Users", otheruser);
//   const Doclocation_num = doc(db, "Users", otheruser);
//   const Doccurrentuser_array = doc(db, "Users", currentuser);
//   const Doccurrentuser_num = doc(db, "Users", currentuser);
//   //for otheruser
//   const AddUserFollow = await updateDoc(Doclocation_array, {
//     Sponsorers: arrayUnion(currentuser),
//   });
//   const increseFollow = await updateDoc(Doclocation_num, {
//     Sponsorers: increment(1),
//   });
//   //for currentuser
//   await updateDoc(Doccurrentuser_array, {
//     Sponsoring: arrayUnion(otheruser),
//   });
//   await updateDoc(Doccurrentuser_num, {
//     Sponsoring: increment(1),
//   });
// }
//UnFollow
export async function UnFollowUser(currentuser, otheruser) {
  const Doclocation = doc(db, "Users", otheruser);
  const Doccurrentuser = doc(db, "Users", currentuser);

  //for otheruser
  if (currentuser) {
    await updateDoc(Doclocation, {
      Followers: arrayRemove(currentuser),
    });
  }

  //for currentuser
  if (otheruser) {
    await updateDoc(Doccurrentuser, {
      Following: arrayRemove(otheruser),
    });
  }
}
//Add Comments
export async function PostComments(
  docid,
  Photo,
  message,
  currentuser,
  UserName,
  UserPhoto
) {
  const Collocation = collection(db, "Announce", docid, "Comments");
  const fileRef = ref(storage, "CommentsPIC/" + uuid.v4() + ".png");

  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const PhotoURL = await (Photo ? getDownloadURL(fileRef) : null);

  const newvalue = {
    PhotoURL,
    message,
    user: currentuser,
    UserName,
    UserPhoto,
    time: serverTimestamp(),
  };
  //upload name
  await addDoc(Collocation, newvalue);
}
//Add UnseenUsers
export async function AddUnseenUsers(currentuser, Followers) {
  const Doclocation = doc(db, "Users", currentuser);
  updateDoc(Doclocation, {
    UnseenUsers: arrayUnion(...Followers),
  });
}
//Add Search History
export async function AddSearchhistory(currentuser, Searchtext) {
  const Collocation = collection(db, "Users", currentuser, "Search");

  addDoc(Collocation, {
    Searchtext,
  });
}
//Get Search History
export async function GetSearchhistory(uid) {
  // const currentuser = useauth();
  const [History, setHistory] = useState();

  if (uid) {
    const Collocation = collection(db, "Users", uid, "Search");

    onSnapshot(Collocation, (snap) => {
      snap.docs.map((data) => {
        if (History == undefined) {
          setHistory(data.data());
        }
      });
    });
  }

  return History;
}
//Remove UnseenUsers
export async function RemoveUnseenUsers(currentuser, otheruser) {
  const Doclocation = doc(db, "Users", otheruser);
  updateDoc(Doclocation, {
    UnseenUsers: arrayRemove(currentuser),
  });
}
