import Avatar from "@mui/material/Avatar";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase.js";
import "./post.css";

function Post({ avatarImage, postImage, userName, caption, postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("iam in");
    // Ensure postId is defined before making the Firestore call
    if (postId) {
      const commentsCollectionRef = collection(db, "first-collection", `${postId}`, "comments");
      getDocs(commentsCollectionRef).then(
        (querySnapshot) => {
          console.log("Comments fetched:", querySnapshot.docs);
          const commentsData = [];
          querySnapshot.forEach((doc) => {
            console.log("Comment ID:", doc.id);
            console.log(doc.id, " => ", doc.data());
            // 👇 **MISTAKE WAS HERE: This line was commented out**
            commentsData.push({ id: doc.id, comment: doc.data() }); // Assuming doc.data() holds the comment object
          });
          // 👇 **MISTAKE WAS HERE: This line was also commented out**
          setComments(commentsData);
        }
      ).catch((error) => {
        // It's good practice to catch potential errors
        console.error("Error fetching comments: ", error);
      });
    }
    console.log("iam iout");
  }, [postId]); // The dependency array is correct, re-running when postId changes.

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="Remy Sharp" src={avatarImage} />
        <h3>Username</h3>
      </div>
      <img className="post__image" src={postImage} alt="Post" />
      <h4 className="post__text">
        <strong>{userName}</strong> : {caption}
      </h4>
    </div>
  );
}

export default Post;
// export default Post;
