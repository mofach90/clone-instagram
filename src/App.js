import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.js";
import Post from "./post.js";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "first-collection"), (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => {
            const data = doc.data();;
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
