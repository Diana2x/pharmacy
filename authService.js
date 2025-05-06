// src/authService.js

import { auth, db } from "./firebase"; // Adjust the path if needed
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Function to register a user and store extra info in Firestore
export const register = async (email, password, name, apellido) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Save additional user data in Firestore under "users" collection
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    name,
    apellido,
    createdAt: new Date(),
  });

  return user;
};

// Function to log in a user
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
