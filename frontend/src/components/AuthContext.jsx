import React, { createContext, useState } from "react";

export const BaseURLContext = createContext();

const AuthContext = ({ children }) => {
  const [token, setToken] = useState("");
  const [baseUrl, setBaseUrl] = useState("https://randomquote-genapplication.onrender.com");

  return (
    <BaseURLContext.Provider value={{ token, setToken, baseUrl }}>
      {children}
    </BaseURLContext.Provider>
  );
};

export default AuthContext;
