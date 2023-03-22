// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeoYltC2y5_V8Dkh5qzeGXd2Uy82BC3kA",
  authDomain: "lms-app-sk01.firebaseapp.com",
  projectId: "lms-app-sk01",
  storageBucket: "lms-app-sk01.appspot.com",
  messagingSenderId: "507590988255",
  appId: "1:507590988255:web:9bc6433fad61cf7542f46a",
  measurementId: "G-JXDP53N2T6"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const database = getFirestore(firebase);
export const cloudStorage = getStorage(firebase);
export const auth = getAuth(firebase);



