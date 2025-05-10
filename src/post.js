import Avatar from "@mui/material/Avatar";
import React from "react";
import "./post.css";

function Post({ avatarImage, postImage, userName, caption }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Remy Sharp"
          src={avatarImage}
        />
        <h3>Username</h3>
      </div>
      <img
        className="post__image"
        src={postImage}
        alt="Post"
      />
      <h4 className="post__text">
        <strong>{userName}</strong> : {caption}
      </h4>
    </div>
  );
}

export default Post;
// export default Post;
