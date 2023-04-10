// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBecFwetzQ2KNbXtHZosmLITBFrSCafb-0",
  authDomain: "beat-marketplace.firebaseapp.com",
  projectId: "beat-marketplace",
  storageBucket: "beat-marketplace.appspot.com",
  messagingSenderId: "711652677200",
  appId: "1:711652677200:web:05134439f9e2f96c2de355",
  measurementId: "G-MJN8EWYCCJ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
