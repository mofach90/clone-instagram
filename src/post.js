import Avatar from "@mui/material/Avatar";
import React from "react";
import "./post.css";

function Post() {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Remy Sharp"
          src="https://cdn.worldvectorlogo.com/logos/react-1.svg"
        />
      <h3>Username</h3>
      </div>
      <img
        className="post__image"
        src="https://vastphotos.com/files/uploads/photos/10306/high-resolution-mountains-and-lakes-l.jpg?v=20220712043521"
        alt="Post"
      />
      <h4 className="post__text">
        <strong>Username</strong> : Caption
      </h4>
    </div>
  );
}

export default Post;
// export default Post;
