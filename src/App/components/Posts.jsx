import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase.js";
import Post from "./Post.jsx";

const Posts = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const q = query(
      collection(db, "first-collection"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
    },(error) => {
      console.log(error);
    }
  
  );
    return unsubscribe;
  }, []);

  return (
    <div className="app__posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          user={user}
          postData= {post}
        />
      ))}
    </div>
  );
};

export default Posts;
