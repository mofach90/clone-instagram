import { onAuthStateChanged, updateProfile } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { auth } from "../firebase.js";
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
        const uid = user.uid;
        console.log("User is signed in:", uid);
        setUser(user);
        if (user.displayName) {
          //
        } else {
          // If we just created a user...
          console.log("User created:", user);
          updateProfile(auth.currentUser, {
            displayName: userName,
          })
            .then(() => {
              // Profile updated!
              console.log("Profile updated:", userName);
              // ...
            })
            .catch((error) => {
              // An error occurred
              console.log("Error updating profile:", error);
              // ...
            });
        }
      } else {
        console.log("User is signed out");
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="app">
      <Header user={user} setUser={setUser} setUserName={setUserName} />
      <Posts user={user} />
      <UploadImages user={user} />
    </div>
  );
}

export default App;
