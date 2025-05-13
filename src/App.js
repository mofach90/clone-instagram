import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { collection, onSnapshot } from "firebase/firestore";
import * as React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase.js";
import Post from "./post.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "first-collection"),
      (snapshot) => {
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
      }
    );
    return unsubscribe;
  }, []);

  return (
    <div className="app">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
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
