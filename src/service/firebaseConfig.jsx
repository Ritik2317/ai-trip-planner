// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_FIREBASE_API,
  authDomain: "ai-trip-planner-bbc81.firebaseapp.com",
  projectId: "ai-trip-planner-bbc81",
  storageBucket: "ai-trip-planner-bbc81.firebasestorage.app",
  messagingSenderId: "79704206979",
  appId: "1:79704206979:web:5fc2104068ecc1611035b6",
  measurementId: "G-WSQ7D5N9PT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);