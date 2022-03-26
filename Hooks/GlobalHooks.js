import React, { useState, useEffect } from "react";
import { Usersforchat } from "../BACKEND/firebase";

//Generate uid
export function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
//getids
export function Participants(participants) {
  const Users = Usersforchat();
  console.log("part", participants);
  console.log("Users", Users);

  const Parts = participants?.map((doc) => {
    return doc;
  });

  console.log("Parts", Parts);

  const filtered = Users?.filter((users) => {
    console.log("USERS:", users.id);

    return Parts?.includes(users?.id);
  });

  return filtered;
}
//format number
export function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return num / 1000 + "K"; // Thousand
  } else if (num > 1000000 && num < 1000000000) {
    return num / 1000000 + "M"; // Million
  } else if (num > 1000000000 && num < 1000000000000) {
    return num / 1000000 + "B"; // Billion
  } else if (num > 1000000000000 && num < 1000000000000000) {
    return num / 1000000 + "T(OMG)"; // Trillion
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}
//compare 2 [] and return the common as []
export function compare2arrays(Bigarray, Smallarray) {
  const [Details, setDetails] = useState();
  if (Smallarray) {
    Smallarray?.then((doc) => {
      // setalreadyfollwing(doc?.Followers.includes(currentuser?.uid));
      setDetails(doc);
    });
  }
  const m = Details?.Followers;
  // console.log("MAPPED", m);

  //filter user
  const filtered = Bigarray?.filter((users) => {
    return m?.includes(users?.id);
  });
  // console.log("FILTERED", filtered);
  return filtered;
}
//get Time from Timestamp
export function TimestamptoTime(time) {
  const fireBaseTime = new Date(
    time?.seconds * 1000 + time?.nanoseconds / 1000000
  );
  const date = fireBaseTime?.toDateString();
  const atTime = fireBaseTime?.toLocaleTimeString();
  const FormattedTime = fireBaseTime
    ?.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/(:\d{2}| )$/, "");

  return { date: date, time: FormattedTime, normaltime: atTime };
}
