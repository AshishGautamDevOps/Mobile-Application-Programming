import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6K_CdDmQlW_pdJ8qElXiVgKR_NSPZ4Hw",
  authDomain: "minutechallenge-3e85a.firebaseapp.com",
  projectId: "minutechallenge-3e85a",
  storageBucket: "minutechallenge-3e85a.firebasestorage.app",
  messagingSenderId: "77640651917",
  appId: "1:77640651917:web:c3a6474113f7fcb60a3ec4",
  measurementId: "G-TPTLKYMBCE",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
