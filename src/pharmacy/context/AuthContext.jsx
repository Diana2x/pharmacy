import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../libs/firebase/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Get user data from localStorage to include isAdmin status
        const userData = JSON.parse(localStorage.getItem("user")) || {};
        
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isAdmin: userData.isAdmin || false // Default to false if not set
        });
      } else {
        setCurrentUser(null);
        // Clear user data from localStorage on logout
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Function to check if user is admin based on the isAdmin flag from Firestore
  const isAdmin = () => {
    return currentUser?.isAdmin === true;
  };

  const value = {
    currentUser,
    loading,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
