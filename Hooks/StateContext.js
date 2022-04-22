import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData } from "../BACKEND/firebase";
const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [LogedIn, setLogedIn] = useState(true);

  return (
    <StateContext.Provider
      value={{
        LogedIn,
        setLogedIn,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseState = () => useContext(StateContext);

export default StateProvider;
