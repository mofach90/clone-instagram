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
  }, [postData.postId]);
  const handleSubmitComment = async (e) => {
    e.preventDefault();
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
    try {
      await addDoc(commentsCollectionRef, {
        userName: user?.displayName,
        text: comment,
        Timestamp: Timestamp.now(),
      });
      setComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Remy Sharp"
          src={postData.avatarImage}
        />
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
      {/* only users can comment */}
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
            onClick={handleSubmitComment}
          >
            Submit
          </button>
        </form>
      ) : null}
    </div>
  );
}

export default Post;
