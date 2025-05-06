import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_PROYECT_API_KEY,
  authDomain: import.meta.env.VITE_PROYECT_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROYECT_ID_FIREBASE,
  storageBucket: import.meta.env.VITE_PROYECT_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PROYECT_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_PROYECT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
