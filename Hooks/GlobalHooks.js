import { isMoment } from "moment";
import React, { useState, useEffect } from "react";
import { Usersforchat } from "../BACKEND/firebase";
import moment from "moment";
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

  const Parts = participants?.map((doc) => {
    return doc;
  });

  const filtered = Users?.filter((users) => {
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

  //filter user
  const filtered = Bigarray?.filter((users) => {
    return Details?.Followers?.includes(users?.id);
  });

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

  // Prepend any date. Use your birthday.
  const timeString12hr = twelvehrsconvertor(FormattedTime);

  return {
    date: date,
    time: timeString12hr,
    normaltime: atTime,
  };
}
export function relativetime(time) {
  const millisec = time.toMillis();
  const Time = moment(new Date(millisec)).fromNow();
  return Time;
}

function twelvehrsconvertor(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}
export function filterAnnounces(Announce, userdetails) {
  // const [Details, setDetails] = useState();
  // if (userdetails) {
  //   userdetails?.then((doc) => {
  //     setDetails(doc);
  //   });
  // }
  // const m = Details?.Following;
  //filter user
  const filtered = Announce?.filter((users) => {
    const final = userdetails?.Following?.includes(users?.currentuser);
    return final;
  });

  return filtered;
}
