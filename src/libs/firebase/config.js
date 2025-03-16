import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PROYECT_API_KEY,
  authDomain: import.meta.env.VITE_PROYECT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_PROYECT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PROYECT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PROYECT_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const FirebaseDB = getFirestore(app);
