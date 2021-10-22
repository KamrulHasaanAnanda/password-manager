import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import "../firebase-config";
// import "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [errors,setErrors] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(`user`, user)
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(email, password, username) {
    const auth = getAuth();
    // console.log(`auth`, auth)
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      // update profile
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      const user = auth.currentUser;
      setCurrentUser({
        ...user,
      });
    }catch(err){
      // console.log(`err`, err)
     setErrors({...err})
    }
  }

  // login function
  function login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout function
  function logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    errors
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}