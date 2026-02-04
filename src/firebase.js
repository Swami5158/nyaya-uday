import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATRd2UdfJnXBQwASwepQ5r70f2ZQr02ZQ",
  authDomain: "nyaya-udya.firebaseapp.com",
  projectId: "nyaya-udya",
  storageBucket: "nyaya-udya.firebasestorage.app",
  messagingSenderId: "477007783978",
  appId: "1:477007783978:web:00537b5ccb3cceee2dfb53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();