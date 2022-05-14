//MODULE DUS GEEN IIFE
// Import the functions you need from the SDKs you need
import { initializeApp } from "../../node_modules/firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "../../node_modules/firebase/auth";
import { getDatabase } from "../../node_modules/firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACz9XwjRWc6k9Mep--iNbDLyxkJqR_zIA",
  authDomain: "routio-33bc2.firebaseapp.com",
  projectId: "routio-33bc2",
  storageBucket: "routio-33bc2.appspot.com",
  messagingSenderId: "20222628765",
  appId: "1:20222628765:web:c45b5667e358d8b5e51574",
  measurementId: "G-VC28HW3SK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase(app);

signin.addEventListener("click", () => {
    console.log("hi")
})