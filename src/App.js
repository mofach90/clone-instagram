import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { auth, db } from "./firebase.js";
import Post from "./post.js";

import { updateProfile } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("open", open);
  }, [open]);
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
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "first-collection"),
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const post = {
            id: doc.id,
            caption: data.caption,
            userName: data.user_name,
            postImage: data.image_url,
            avatarImage: data.avatar_image,
          };
          return post;
        });
        setPosts(fetchedPosts);
      }
    );
    return unsubscribe;
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    console.log("Sign Up");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        // ..
      });
    setOpen(false);
  };
  const signOut = (e) => {
    auth.signOut().catch((error) => {
      // An error happened.
      console.log("Error signing out:", error);
    });
    console.log("Sign Out");
  };

  return (
    <div className="app">
      {user ? (
        <>
          <Button onClick={signOut}>LOGOUTy</Button>
          <Button onClick={() => console.log("heydsjfkjh")}>test</Button>
        </>
      ) : (
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app__signup">
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>
      <div className="app__header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="headerImage"
          className="app__headerImage"
        />
      </div>
      <h1>Welcome to React </h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          caption={post.caption}
          userName={post.userName}
          postImage={post.postImage}
          avatarImage={post.avatarImage}
        />
      ))}
    </div>
  );
}

export default App;
