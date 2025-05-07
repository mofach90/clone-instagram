import React from "react";
import "./post.css";

function Post() {
  return (
    <div className="post">
      <h3>Username</h3>
      <img
        className="post__image"
        src="https://cdn.worldvectorlogo.com/logos/react-1.svg"
        alt="Post"
      />
      <h4 className="post__text"><strong>Username</strong> : Caption</h4>
    </div>
  );
}

export default Post;
// export default Post;
