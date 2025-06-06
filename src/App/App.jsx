import { onAuthStateChanged, updateProfile } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase.js";
import "../styles/App.css";
import Header from "./components/Header.jsx";
import Posts from "./components/Posts.jsx";
import UploadImages from "./components/UploadImages.jsx";

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (user.displayName) {
          // that means , user has a profile, nothing to do
        } else {
          // that means user signed up for the first time so i need to update his displayName 
          updateProfile(auth.currentUser, {
            displayName: userName,
          })
            .then(() => {
              console.log("Profile updated:", userName);
            })
            .catch((error) => {
              console.log("Error updating profile:", error);
            });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <Header user={user} setUser={setUser} setUserName={setUserName} />
      <Posts user={user} />
      <UploadImages user={user} />
    </div>
  );
}

export default App;
