import { onAuthStateChanged, updateProfile } from "firebase/auth";
import * as React from "react";
import { useEffect, useState } from "react";
import "../styles/App.css";
import Header from "./components/Header.jsx";
import Posts from "./components/Posts.jsx";
import UploadImages from "./components/UploadImages.jsx";
import authenticationListner from "./listner/authListen.js"

function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticationListner(userName, user, setUserName)
    return () => {
      authenticationListner();
    };
  }, [user, userName]);

  return (
    <div className="app">
      <Header user={user} setUser={setUser} setUserName={setUserName} />
      <Posts user={user} />
      <UploadImages user={user} />
    </div>
  );
}

export default App;
