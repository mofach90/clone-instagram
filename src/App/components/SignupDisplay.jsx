import { Button, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../config/firebase.js";
import { style } from "../../styles/styles.js";

const SignupDisplay = ({ open, setOpen, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });
      } else {
        throw new Error("User not authenticated. Unable to update profile.");
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });
      setUser(userCredential.user);
      setOpen(false);
      
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    }
  };
  return (
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
  );
};

export default SignupDisplay;
