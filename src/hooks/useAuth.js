import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from '../firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = firebase.auth;

  const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const signup = (email, password) => {
    const user = {
      email,
      password,
    };
    setUser(user);
  };

  const signout = () => {
    setUser(false);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        console.log('logged in as ' + user.email);
        setUser(user);
      } else {
        console.log('no user in');
        setUser(false);
      }
      setIsLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  // Return the user object and auth methods
  return {
    user,
    isLoading,
    signin,
    signup,
    signout,
  };
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
