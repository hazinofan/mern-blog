// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ae86a.firebaseapp.com",
  projectId: "mern-blog-ae86a",
  storageBucket: "mern-blog-ae86a.appspot.com",
  messagingSenderId: "744147792983",
  appId: "1:744147792983:web:bdf9a9f44b7c8c967f9f12"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);