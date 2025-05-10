// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaU8qZl0EU52NtwgxE2t_q5u1hqNuClDw",
  authDomain: "mo-instagram-clone.firebaseapp.com",
  projectId: "mo-instagram-clone",
  storageBucket: "mo-instagram-clone.firebasestorage.app",
  messagingSenderId: "105841606272",
  appId: "1:105841606272:web:b8f3ca9b2204640cfef065",
  measurementId: "G-3XYWM2VJD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export { auth, db, storage };
