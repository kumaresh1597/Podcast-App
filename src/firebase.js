// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQt0t8OlGSmPpdrPMzEvXJ3bZlVqiwPVA",
  authDomain: "podcast-app-react-b7bab.firebaseapp.com",
  projectId: "podcast-app-react-b7bab",
  storageBucket: "podcast-app-react-b7bab.appspot.com",
  messagingSenderId: "88172895441",
  appId: "1:88172895441:web:3fc9def200dc0f1e6d39f0",
  measurementId: "G-9228P8G1CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
