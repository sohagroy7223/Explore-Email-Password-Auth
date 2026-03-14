// DON'T SHARE THIS CODE ONLINE!!

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFu6_M0AJCncDoFN8XWroobsoSY5GKXv4",
  authDomain: "explore-email-password-ba5d6.firebaseapp.com",
  projectId: "explore-email-password-ba5d6",
  storageBucket: "explore-email-password-ba5d6.firebasestorage.app",
  messagingSenderId: "877783285322",
  appId: "1:877783285322:web:90040d8c761c82398f70b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
