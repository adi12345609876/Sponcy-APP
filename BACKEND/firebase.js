import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
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
import { getApp, getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "./1.Config";
if (getApps().length < 1) {
  initializeApp(firebaseConfig);
  // Initialize other firebase products here
}

const firebaseApp = getApp();
export const storage = getStorage(firebaseApp, "gs://sponcy-7003f.appspot.com");
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

//get chat rooms
export function ChatRooms() {
  const currentuser = useauth();
  const [Rooms, setRooms] = useState();
  const [Notification, setNotification] = useState();
  const Collocation = collection(db, "Private-Chat");

  useEffect(() => {
    if (currentuser) {
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

export function OneOneMess(currentUser) {
  const [Messages, setMessages] = useState();

  useEffect(() => {
    if (currentUser) {
      const Collocation = collection(db, "Users", currentUser, "OneOneChat");

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

//Get specific user

export function SpecifiedUserData(useruid) {
  const [Users, setUsers] = useState();

  useEffect(() => {
    if (useruid) {
      const doclocation = doc(db, "Users", useruid);

      getDoc(doclocation).then((doc) => {
        setUsers(doc.data());
      });
    }
  }, [useruid]);

  return Users;
}
//SET
//SetUser
export async function setUser(uid) {
  const doclocation = doc(db, "Users", uid);
  const doclocation2 = doc(db, "Users", uid);
  const newvalue = {
    UserName: "",
    PhotoURL:
      "https://firebasestorage.googleapis.com/v0/b/sponcy-7003f.appspot.com/o/Person.png?alt=media&token=79018f26-8263-4230-8713-97c68a845570.png",
    Bio: "",
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
    Sponsorers: [],
    Sponsoring: [],
  });
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
}

//ADD
//Join User

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
  UserPhoto
) {
  const doclocation = collection(
    db,
    "Announce",
    "LltxTedBAbKMuN07tX6j",
    "Message"
  );
  const fileRef = ref(storage, "AnnouncePIC/" + uuid.v4() + ".png");
  //upload image
  Photo ? await uploadBytes(fileRef, Photo) : null;
  const PhotoURL = Photo ? await getDownloadURL(fileRef) : null;

  const newvalue = UserPhoto
    ? {
        PhotoURL,
        message,
        currentuser,
        Like: 0,
        LikedUser: [],
        UserName,
        UserPhoto,
        time: serverTimestamp(),
      }
    : {
        PhotoURL,
        message,
        currentuser,
        Like: 0,
        LikedUser: [],
        UserName,
        UserPhoto: null,
        time: serverTimestamp(),
      };
  //upload name

  await addDoc(doclocation, newvalue);
}

export async function PostOnetoOnechat(
  otheruser,
  currentUser,
  text,
  name,
  icon,
  Forwarded,
  Invite,
  InvitationData,
  Photo,
  PhotoDetails,
  Sponsor,
  otheruserdata
) {
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
  const fileRef = ref(storage, "PrivateDoc/" + uuid.v4() + ".png");

  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const PhotoURL = await (Photo ? getDownloadURL(fileRef) : null);
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
    : PhotoURL
    ? {
        From: currentUser,
        text,
        PhotoURL,
        Type: PhotoDetails.mimeType,
        Size: PhotoDetails.size,
        Name: PhotoDetails.name,
        Forwarded: Forwarded,
        // seen: false,
        time: serverTimestamp(),
      }
    : Sponsor
    ? {
        From: currentUser,
        text,
        Forwarded: Forwarded,
        time: serverTimestamp(),
        Type: "Sponsor",
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
  await setDoc(doc(db, "Users", currentUser, "OneOneChat", otheruser), {
    RoomName: otheruserdata?.UserName,
    icon: otheruserdata?.PhotoURL,
    LastMessage: text,
    Type: "OneToOne",
    Seen: true,
  });

  await addDoc(Collocation, newvalue);
  await addDoc(Collocation2, newvalue);

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
  InvitationData,
  Photo,
  PhotoDetails
) {
  const Collocation = collection(db, "Private-Chat", roomid, "Messages");
  const docrom = doc(db, "Private-Chat", roomid);

  const fileRef = ref(storage, "PrivateDoc/" + uuid.v4() + ".png");

  //upload image
  const snapshot = await uploadBytes(fileRef, Photo);
  const PhotoURL = await (Photo ? getDownloadURL(fileRef) : null);
  const newvalue = Invite
    ? {
        From,
        text,
        Forwarded: Forwarded,
        // seen: false,
        time: serverTimestamp(),
        Invite: Invite,
        Invitationid: InvitationData?.id,
      }
    : Forwarded && PhotoURL
    ? {
        From,
        text,
        PhotoURL,
        Type: PhotoDetails.mimeType,
        Size: PhotoDetails.size,
        Name: PhotoDetails.name,
        Forwarded: Forwarded,

        time: serverTimestamp(),
      }
    : Forwarded && !PhotoURL
    ? {
        From,
        text,
        Forwarded: Forwarded,
        time: serverTimestamp(),
      }
    : PhotoURL
    ? {
        From,
        PhotoURL,
        Type: PhotoDetails.mimeType,
        Size: PhotoDetails.size,
        Name: PhotoDetails.name,
        text,
        time: serverTimestamp(),
      }
    : { text, time: serverTimestamp(), From };
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
    owner: useruid,
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

//Add UnreadUsers
export async function AddUnreadUser(roomid, participants) {
  // const currentuser = useauth();
  const doclocation = doc(db, "Private-Chat", roomid);

  updateDoc(doclocation, {
    UnreadUsers: arrayUnion(...participants),
  });
}
//DELETE
//Delete Rooms
export async function LeaveRoom(docid, useruid) {
  const doclocation = doc(db, "Private-Chat", docid);
  await updateDoc(doclocation, {
    Participants: arrayRemove(useruid),
  });
}
export async function CreatePosting(docid, useruid, Post) {
  const doclocation = doc(db, "Private-Chat", docid);
  if (Post == "owner") {
    await updateDoc(doclocation, {
      owner: useruid,
    });
  } else if (Post == "Leader") {
    await updateDoc(doclocation, {
      Leaders: arrayUnion(useruid),
    });
  }
}
export async function DeleteUnreadUser(roomid, currentuser, Type) {
  // const currentuser = useauth();
  if (Type == "OneToOne") {
    const Doclocation2 = doc(db, "Users", currentuser, "OneOneChat", roomid);

    updateDoc(Doclocation2, {
      Seen: true,
    });
  } else {
    const doclocation = doc(db, "Private-Chat", roomid);
    updateDoc(doclocation, {
      UnreadUsers: arrayRemove(currentuser),
    });
  }
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
      }
    }
  });
}
export async function updateTheme(Theme) {
  const doclocation = doc(db, "Users", currentuser?.uid);

  try {
    await updateDoc(doclocation, {
      Theme,
    });
  } catch (e) {
    console.log(e);
  }
}
