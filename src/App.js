import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Post from "./post.js";

function App() {
  const [posts, setPosts] = useState([
    {
      caption: "caption",
      userName: "UnserName",
      postImage:
        "https://vastphotos.com/files/uploads/photos/10306/high-resolution-mountains-and-lakes-l.jpg?v=20220712043521",
      avatarImage: "https://cdn.worldvectorlogo.com/logos/react-1.svg",
      id: uuidv4(),
    },
    {
      caption: "caption",
      userName: "UnserName",
      postImage:
        "https://vastphotos.com/files/uploads/photos/10306/high-resolution-mountains-and-lakes-l.jpg?v=20220712043521",
      avatarImage: "https://cdn.worldvectorlogo.com/logos/react-1.svg",
      id: uuidv4(),
    },
  ]);

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
