import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAi_8Q6iiVjPlHCybNEerm85-6BKcfktCQ",
  authDomain: "kuk-notes-a48c1.firebaseapp.com",
  projectId: "kuk-notes-a48c1",
  storageBucket: "kuk-notes-a48c1.firebasestorage.app",
  messagingSenderId: "936894505733",
  appId: "1:936894505733:web:9133389bc6e9bedfe9cd6c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);