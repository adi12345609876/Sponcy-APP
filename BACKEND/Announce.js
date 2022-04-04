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
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useauth } from "./Auth";
import uuid from "react-native-uuid";
import { db, storage } from "./firebase";

//Get Announce
export function Announces() {
  const [Announce, setAnnounce] = useState();
  const Collocation = collection(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message"
  );
  const q = query(Collocation, orderBy("time"));
  useEffect(() => {
    onSnapshot(Collocation, (snapshot) => {
      if (!snapshot.empty) {
        setAnnounce(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      } else {
        console.log("NO ANNOUNCES😲😮");
      }
    });
  }, []);

  return Announce;
}
//Get Comments
export function getComments(docid) {
  const [Comments, setComments] = useState();
  const Collocation = collection(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message",
    docid,
    "Comments"
  );
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
      console.log("user:", useruid);

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
    } else {
      console.error("OOPS !DEFINE AN USERUID");
    }
  }, [currentuser]);

  return CurrentUserComments;
}
//Get Followers and Following
export async function getUserDetailsCollection(otheruser) {
  const [Comments, setComments] = useState();

  useEffect(() => {
    if (otheruser) {
      const Doclocation_array = doc(
        db,
        "Users",
        otheruser,
        "Details",
        "EventsDoc"
      );
      onSnapshot(Doclocation_array, (snap) => {
        setComments(snap.data());
      });
    } else {
      console.error("OOPS !NO USER IS DEFINED BY DEFAULT");
    }
  }, [otheruser]);

  // console.log("Details", Comments);
  return Comments;
  // return await getDoc(Doclocation_array).then((doc) => doc.data());
}
//Like
export async function Likemessage(currentuser, messageid) {
  const Doclocation2 = doc(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message",
    messageid
  );
  const AddUserLIked = updateDoc(Doclocation2, {
    LikedUser: arrayUnion(currentuser),
  });

  const increseliked = updateDoc(Doclocation2, {
    Like: increment(1),
  });

  console.log("Liked");
}
//Unlike
export async function Dislikemessage(currentuser, messageid) {
  // const [AnnounceData, setAnnounceData] = useState();

  const Doclocation2 = doc(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message",
    messageid
  );

  // await deleteDoc(Doclocation)
  const RemoveUserLIked = updateDoc(Doclocation2, {
    LikedUser: arrayRemove(currentuser),
  });

  // if (get.Like != 0) {
  updateDoc(Doclocation2, {
    Like: increment(-1),
  });
  // }

  console.log("DisLiked", get);
}
//Follow
export async function FollowUser(currentuser, otheruser) {
  //const [Comments, setComments] = useState();

  const Doclocation_array = doc(db, "Users", otheruser, "Details", "EventsDoc");
  const Doclocation_num = doc(db, "Users", otheruser);
  const Doccurrentuser_array = doc(
    db,
    "Users",
    currentuser,
    "Details",
    "EventsDoc"
  );
  const Doccurrentuser_num = doc(db, "Users", currentuser);
  //for otheruser
  const AddUserFollow = await updateDoc(Doclocation_array, {
    Followers: arrayUnion(currentuser),
  });
  const increseFollow = await updateDoc(Doclocation_num, {
    Followers: increment(1),
  });
  //for currentuser
  await updateDoc(Doccurrentuser_array, {
    Following: arrayUnion(otheruser),
  });
  await updateDoc(Doccurrentuser_num, {
    Following: increment(1),
  });
  console.log("Followering", otheruser, "by", currentuser);
}
//UnFollow
export async function UnFollowUser(currentuser, otheruser) {
  // const [AnnounceData, setAnnounceData] = useState();

  const Doclocation_array = doc(db, "Users", otheruser, "Details", "EventsDoc");
  const Doclocation_num = doc(db, "Users", otheruser);
  const Doccurrentuser_array = doc(
    db,
    "Users",
    currentuser,
    "Details",
    "EventsDoc"
  );
  const Doccurrentuser_num = doc(db, "Users", currentuser);
  const get = await getDoc(Doclocation_num).then((doc) => doc.data());
  //for otheruser
  const RemoveUserFollow = await updateDoc(Doclocation_array, {
    Followers: arrayRemove(currentuser),
  });
  // if (get.Like != 0) {
  await updateDoc(Doclocation_num, {
    Followers: increment(-1),
  });
  // }
  //for currentuserReplies
  await updateDoc(Doccurrentuser_array, {
    Following: arrayRemove(otheruser),
  });
  // if (get.Like != 0) {
  await updateDoc(Doccurrentuser_num, {
    Following: increment(-1),
  });
  // }

  console.log("DisLiked", get);
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
  const Collocation = collection(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message",
    docid,
    "Comments"
  );
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
