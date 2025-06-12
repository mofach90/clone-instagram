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
        alert("Email and password cannot be empty.");
        return;
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
      onClose={() => {
        if (window.confirm("Are you sure you want to close the modal? Unsaved changes will be lost.")) {
          setOpen(false);
        }
      }}
      aria-labelledby="modal-modal-title"
          <Input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
