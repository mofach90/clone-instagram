import { onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase.js";
import "../styles/App.css";
import Header from "./components/Header.jsx";
import Posts from "./components/Posts.jsx";
import UploadImages from "./components/UploadImages.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
      <Header user={user} setUser={setUser} />
      <Posts user={user} />
      <UploadImages user={user} />
    </div>
  );
}

export default App;
