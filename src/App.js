import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.js";
import Post from "./post.js";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    function fetchData() {
      
      const querySnapshot = onSnapshot(
        collection(db, "first-collection"),
        (collection) => {
          setPosts((posts) => []);
          collection.forEach((doc) => {
            console.log("Data fetched from Firestore", typeof doc.data());
            const post = {
              id: doc.id,
              caption: doc.data().caption,
              userName: doc.data().user_name,
              postImage: doc.data().image_url,
              avatarImage: doc.data().avatar_image,
            };
            
            setPosts((posts) => [...posts, post]);
            console.log("Post data", post);
            console.log("Posts data", posts);
          });
        }
      );
      // const querySnapshot = await getDocs(collection(db, "first-collection"));
    }
    fetchData();
    console.log("Data fetched from Firestore", posts);
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
      {posts.map((post, index) => (
        <Post
          key={index}
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
