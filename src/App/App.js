import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import * as React from "react";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase.js";
import Post from "../post.js";
import UploadImages from "../uploadImages.js";
import "./App.css";
import Header from "./components/Header.jsx";


function App() {
  const [posts, setPosts] = useState([]);
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

  useEffect(() => {
    const q = query(
      collection(db, "first-collection"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("data", data);
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
    });
    return unsubscribe;
  }, []);

  return (
    <div className="app">
      <Header
        user={user}
        setUser={setUser}
        setUserName={setUserName}
      />
      <div className="app__posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            caption={post.caption}
            userName={post.userName}
            postImage={post.postImage}
            avatarImage={post.avatarImage}
            user={user}
          />
        ))}
      </div>

      {user?.displayName ? (
        <UploadImages userName={user.displayName} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            border: "solid 2px red ",
            width: "20%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "40px",
            padding: "3px",
          }}
        >
          "Please login first"
        </div>
      )}
    </div>
  );
}

export default App;
