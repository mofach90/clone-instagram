import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase.js";
import "./App.css";
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

const Header = ({ user, setUser, userName,setUserName  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const signOut = () => {
    auth.signOut().catch((error) => {
      // An error happened.
      console.log("Error signing out:", error);
    });
    console.log("Sign Out");
  };
  const signUp = (e) => {
    e.preventDefault();
    console.log("Sign Up");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        // ..
      });
    setOpen(false);
  };
  const signIn = (e) => {
    e.preventDefault();
    console.log("Sign In");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(errorMessage);
        // ..
      });
    setOpenLogin(false);
  };
  return (
    <div className="app__header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="headerImage"
        className="app__headerImage"
      />
      {user ? (
        <>
          <Button onClick={signOut}>LOGOUT</Button>
        </>
      ) : (
        <div className="app__login">
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
          <Button onClick={() => setOpenLogin(true)}>Log In</Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app__signup">
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app__signup">
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>
              Log In
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
