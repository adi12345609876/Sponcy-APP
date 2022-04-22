import React, { createContext, useContext, useState, useEffect } from "react";
import { UserData } from "../BACKEND/firebase";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [Dark, setDark] = useState(true);
  const Currentuserdata = UserData();

  return (
    <ThemeContext.Provider
      value={{
        Dark,
        setDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
