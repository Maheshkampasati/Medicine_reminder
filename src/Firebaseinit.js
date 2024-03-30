// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXQHDg_Y4sMviFS1kDdwsLfopeTeU1tbo",
    authDomain: "medicineremainder-cf472.firebaseapp.com",
    databaseURL: "https://medicineremainder-cf472-default-rtdb.firebaseio.com",
    projectId: "medicineremainder-cf472",
    storageBucket: "medicineremainder-cf472.appspot.com",
    messagingSenderId: "679903236700",
    appId: "1:679903236700:web:5c83f6ead7cc170a3b4c99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Storage = getStorage(app);
export const db = getDatabase(app);
export const DataBase = getFirestore(app);