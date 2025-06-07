import Avatar from "@mui/material/Avatar";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase.js";
import "../../styles/post.css";

function Post({ user, postData }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (postData.postId) {
      const commentsCollectionRef = query(
        collection(db, "first-collection", postData.postId, "comments"),
        orderBy("Timestamp", "desc")
      );
      onSnapshot(commentsCollectionRef, (querySnapshot) => {
        const commentsData = querySnapshot.docs.map((doc) => {
          return {
            userName: doc.data().userName,
            text: doc.data().text,
            id: doc.id,
          };
        });
        setComments(commentsData);
      });
    }
    console.log("iam iout");
  }, [postData.postId]); // The dependency array is correct, re-running when postId changes.
  const handelSubmitComment = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (comment.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }
    const commentsCollectionRef = collection(
      db,
      "first-collection",
      postData.postId,
      "comments"
    );
    addDoc(commentsCollectionRef, {
      userName: user?.displayName || "Anonymous", // Use displayName or fallback to "Anonymous"
      text: comment,
      Timestamp: Timestamp.now(), // Add a timestamp for the comment
    })
      .then(() => {
        console.log("Comment added successfully");
        setComment(""); // Clear the comment input after submission
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="Remy Sharp" src={postData.avatarImage} />
        <h3>Username</h3>
      </div>
      <img className="post__image" src={postData.postImage} alt="Post" />
      <h4 className="post__text">
        <strong>{postData.userName}</strong> : {postData.caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p key={comment.id} className="post__comment">
            <strong>{comment.userName}</strong> : {comment.text}
          </p>
        ))}
      </div>
      {user ? (
        <form className="post__commentBox">
          <input
            className="comment__input"
            type="text"
            placeholder="Add your comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            className="comment__button"
            type="submit"
            onClick={handelSubmitComment}
          >
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default Post;
