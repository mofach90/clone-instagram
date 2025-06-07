import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase.js";
import { style } from "../../styles/styles.js";

const LoginDisplay = ({ openLogin, setOpenLogin, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    console.log("Sign In");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setOpenLogin(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  };
  return (
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
  );
};

export default LoginDisplay;
