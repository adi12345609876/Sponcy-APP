import React, { createContext, useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [showLoading, setshowLoading] = useState(false);
  const [showLocalLoading, setshowLocalLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        setshowLoading,
        showLocalLoading,
        setshowLocalLoading,
      }}
    >
      {showLoading && (
        <View
          style={{
            flex: 1,
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

export default LoadingProvider;
