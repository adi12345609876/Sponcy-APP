import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
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

const storage = getStorage();
export const db = getFirestore();

//GET
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
//getAnnnounce
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
//get chat rooms
export function ChatRooms() {
  const currentuser = useauth();
  const [Rooms, setRooms] = useState();
  const [Notification, setNotification] = useState();
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
//here
export function OneOneMess(currentUser) {
  const currentuser = useauth();
  const [Messages, setMessages] = useState();

  useEffect(() => {
    if (currentUser) {
      const Collocation = collection(db, "Users", currentUser, "OneOneChat");
      console.log("currentUser", currentUser);
      onSnapshot(Collocation, (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [currentUser]);

  return Messages;
}
//get private messages
export function PrivateChats(roomid) {
  const [PrivateChats, setPrivateChats] = useState();
  const currentuser = useauth();
  const Collocation = collection(db, "Private-Chat", roomid, "Messages");
  const q = query(Collocation, orderBy("time"));

  useEffect(() => {
    if (currentuser) {
      onSnapshot(q, (snapshot) => {
        setPrivateChats(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [currentuser]);
  return PrivateChats;
}
export function OneOneChats(id) {
  const [PrivateChats, setPrivateChats] = useState();
  const currentuser = useauth();

  useEffect(() => {
    if (currentuser) {
      const Collocation = collection(
        db,
        "Users",
        currentuser?.uid,
        "OneOneChat",
        id,
        "Messages"
      );
      const q = query(Collocation, orderBy("time"));
      onSnapshot(q, (snapshot) => {
        setPrivateChats(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [currentuser]);
  return PrivateChats;
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
//get Comments
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
//get users Comments
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
  //O6tp6cfSWtOJfNaW3CINq4lWnc43
}

//Likes
export async function Likemessage(currentuser, messageid) {
  //const [Comments, setComments] = useState();

  const Doclocation2 = doc(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message",
    messageid
  );
  const AddUserLIked = await updateDoc(Doclocation2, {
    LikedUser: arrayUnion(currentuser),
  });

  const increseliked = await updateDoc(Doclocation2, {
    Like: increment(1),
  });

  console.log("Liked");
}
export async function Dislikemessage(currentuser, messageid) {
  // const [AnnounceData, setAnnounceData] = useState();

  const Doclocation2 = doc(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message",
    messageid
  );

  const get = await getDoc(Doclocation2).then((doc) => doc.data());
  // await deleteDoc(Doclocation)
  const RemoveUserLIked = await updateDoc(Doclocation2, {
    LikedUser: arrayRemove(currentuser),
  });

  // if (get.Like != 0) {
  await updateDoc(Doclocation2, {
    Like: increment(-1),
  });
  // }

  console.log("DisLiked", get);
}
//Followers
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
//get users Details Collection
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
//Get specific user

export function SpecifiedUserData(useruid) {
  const [Users, setUsers] = useState();

  useEffect(() => {
    if (useruid) {
      const doclocation = doc(db, "Users", useruid);
      //mount
      let isMounted = true;
      //condition
      getDoc(doclocation).then((doc) => {
        if (isMounted) setUsers(doc.data());
      });

      //unmount
      return () => {
        isMounted = false;
      };
    }
  }, [useruid]);

  return Users;
}
//SET
//SetUser
export async function setUser(uid) {
  const doclocation = doc(db, "Users", uid);
  const doclocation2 = doc(db, "Users", uid, "Details", "EventsDoc");
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
    CreatedAt: serverTimestamp(),
  };
  await setDoc(doclocation, newvalue);
  await setDoc(doclocation2, {
    Followers: [],
    Following: [],
  });
  console.log("DONE");
}

//UPDATE
//updateUser
export async function updateUser(UserName, Photo, Slogan, currentuser) {
  console.log("currentuser", currentuser);

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
  //upload name
  await setDoc(doclocation, newvalue);

  console.log(getDoc(doclocation));
}
//EdiRooms
export async function EditRoom(docid, RoomName, icon, Participants) {
  const doclocation = doc(db, "Private-Chat", docid);
  const newvalue = {
    RoomName,
    Participants: Participants,
    icon,
  };
  updateDoc(doclocation, newvalue);
  console.log("Updated Room" + docid);
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
//ADD
//Join User
//here
export async function JoinUser(Invitationid, currentuser) {
  const doclocation = doc(db, "Private-Chat", Invitationid);
  await updateDoc(doclocation, {
    Participants: arrayUnion(currentuser),
  });
}
//Add Message
export async function PostAnnounce(
  Photo,
  message,
  currentuser,
  UserName,
  UserPhoto,
  setdone
) {
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
    Like: 0,
    LikedUser: [],
    UserName,
    UserPhoto,
    time: serverTimestamp(),
  };
  //upload name
  await addDoc(doclocation, newvalue);
  setdone(false);
}
//Add ONE-One messages

// export async function CreateOnetoOnechat(
//   currentUser,
//   otheruser,
//   text,
//   name,
//   icon
// ) {
//   console.log(
//     "FROM:",
//     currentUser,
//     "TO:",
//     otheruser,
//     "TEXT:",
//     text,
//     "name:",
//     name,
//     "icon",
//     icon
//   );

//   const Collocation = collection(
//     db,
//     "Users",
//     otheruser,
//     "OneOneChat",
//     currentUser,
//     "Messages"
//   );
//   const newvalue = {
//     From: currentUser,
//     text,
//     seen: false,
//     time: serverTimestamp(),
//   };

//   await setDoc(doc(db, "Users", otheruser, "OneOneChat", currentUser), {
//     RoomName: name,
//     icon: icon,
//     LastMessage: "",
//     Type: "OneToOne",
//   });

//   await addDoc(Collocation, newvalue);
//   console.log("SUCCESS");

//   //last message
// }
export async function PostOnetoOnechat(
  otheruser,
  currentUser,
  text,
  name,
  icon,
  Forwarded,
  Invite,
  InvitationData
) {
  console.log(
    "FROM:",
    currentUser,
    "TO:",
    otheruser,
    "TEXT:",
    text,
    "name:",
    name,
    "icon",
    icon
  );

  const Collocation = collection(
    db,
    "Users",
    otheruser,
    "OneOneChat",
    currentUser,
    "Messages"
  );
  const Collocation2 = collection(
    db,
    "Users",
    currentUser,
    "OneOneChat",
    otheruser,
    "Messages"
  );
  const Doclocation = doc(db, "Users", currentUser, "OneOneChat", otheruser);

  updateDoc(Doclocation, {
    Seen: false,
  });
  const newvalue = Invite
    ? {
        From: currentUser,
        text,
        Forwarded: Forwarded,
        // seen: false,
        time: serverTimestamp(),
        Invite: Invite,
        Invitationid: InvitationData?.id,
      }
    : {
        From: currentUser,
        text,
        Forwarded: Forwarded,
        // seen: false,
        time: serverTimestamp(),
      };
  await setDoc(doc(db, "Users", otheruser, "OneOneChat", currentUser), {
    RoomName: name,
    icon: icon,
    LastMessage: text,
    Type: "OneToOne",
    Seen: false,
  });

  await addDoc(Collocation, newvalue);
  await addDoc(Collocation2, newvalue);
  console.log("SUCCESS");

  //last message
}

export async function PostPrivateChats(
  roomid,
  From,
  text,
  participants,
  name,
  icon,
  Forwarded,
  Invite,
  InvitationData
) {
  const Collocation = collection(db, "Private-Chat", roomid, "Messages");
  const docrom = doc(db, "Private-Chat", roomid);

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
  const newvalue = Invite
    ? {
        From: currentUser,
        text,
        Forwarded: Forwarded,
        // seen: false,
        time: serverTimestamp(),
        Invite: Invite,
        Invitationid: InvitationData?.id,
      }
    : {
        From: currentUser,
        text,
        Forwarded: Forwarded,
        // seen: false,
        time: serverTimestamp(),
      };
  // const newvalue2 = {
  //   LastMessage: "",
  //   Participants: participants,
  //   RoomName: name,
  //   icon: icon,

  //   // time: serverTimestamp(),
  // };
  // onSnapshot(Collocation, (snapshot) => {
  //   if (snapshot.empty) {
  //     setDoc(docrom, newvalue2);
  //   }
  // });

  //unreadusers
  await updateDoc(docrom, {
    UnreadUsers: participants,
  });
  //remove posted user from unread user
  await updateDoc(docrom, {
    UnreadUsers: arrayRemove(From),
  });
  await updateDoc(docrom, {
    LastMessage: text,
  });
  //postmessage
  await addDoc(Collocation, newvalue);
  //last message
}
//Add Rooms
export async function AddRooms(Photo, RoomName, Participants, useruid) {
  const doclocation = collection(db, "Private-Chat");

  const newvalue = {
    LastMessage: "",
    Participants: Participants,
    RoomName,
    icon: "",

    // time: serverTimestamp(),
  };
  //upload name
  const room = await addDoc(doclocation, newvalue);
  const uploadPhoto = await Addroomphoto(Photo, room.id);
}
//Add Room icon
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
//post Comments
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
//Add UnreadUsers
export async function AddUnreadUser(roomid, participants) {
  // const currentuser = useauth();
  const doclocation = doc(db, "Private-Chat", roomid);

  updateDoc(doclocation, {
    UnreadUsers: arrayUnion(...participants),
  });
  console.log("Notified");
}
//DELETE
//Delete Rooms
export async function LeaveRoom(docid, currentuser) {
  const doclocation = doc(db, "Private-Chat", docid);
  await updateDoc(doclocation, {
    Participants: arrayRemove(currentuser),
  });

  console.log("Left Room" + docid);
}
//here
export async function DeleteUnreadUser(roomid, currentuser, Type) {
  // const currentuser = useauth();
  const doclocation = doc(db, "Private-Chat", roomid);
  if (Type == "OneToOne") {
    const Doclocation2 = doc(db, "Users", currentuser, "OneOneChat", roomid);

    updateDoc(Doclocation2, {
      Seen: true,
    });
    console.log("SAW MESSAGES");
  }
  updateDoc(doclocation, {
    UnreadUsers: arrayRemove(currentuser),
  });
  console.log("Message Viewed");
}
export async function DeleteUnreadUserOnMess(roomid, currentuser, Type) {
  // const currentuser = useauth();
  const doclocation = doc(db, "Private-Chat", roomid);
  const Collocation = collection(db, "Private-Chat", roomid, "Messages");

  onSnapshot(Collocation, (s) => {
    if (currentuser) {
      updateDoc(doclocation, {
        UnreadUsers: arrayRemove(currentuser),
      });
      if (Type == "OneToOne") {
        updateDoc(doc(db, "Users", currentuser, "OneOneChat", roomid), {
          Seen: true,
        });
        console.log("SAW MESSAGES");
      }
    }
  });

  console.log("Message Viewed");
}
