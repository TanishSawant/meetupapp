import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setUser] = useState();

  function signUp(email, password) {
    auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      return unsubscribe;
  }, []);

  
  const value = {
    currentUser,
    signUp,
    signIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
