import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCLEp_Y1C9tDfSPnVUlZ6E7uHI9AdhzCdA",
  authDomain: "cpl-mo.firebaseapp.com",
  projectId: "cpl-mo",
  storageBucket: "cpl-mo.firebasestorage.app",
  messagingSenderId: "544306654076",
  appId: "1:544306654076:web:adad05e3c54cfd80d892f9",
  measurementId: "G-CPZH2E9K04"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
console.log("Firebase initialized", auth, db, storage);
export { auth, db, storage };
