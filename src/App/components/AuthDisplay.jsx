import { Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase";
import "../App.css";
import LoginDisplay from "./LoginDisplay";
import SignupDisplay from "./SignupDisplay";

const AuthDisplay = ({ user, setUser, setUserName }) => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const SignOut = () => {
    auth.signOut().catch((error) => {
      console.log("Error signing out:", error);
    });
  };

  return (
    <>
      {user ? (
        <Button onClick={SignOut}>LOGOUT</Button>
      ) : (
        <div className="app__login">
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
          <Button onClick={() => setOpenLogin(true)}>Log In</Button>
        </div>
      )}
      <SignupDisplay
        setOpen={setOpen}
        open={open}
        setUser={setUser}
        setUserName={setUserName}
      />
      <LoginDisplay
        setOpenLogin={setOpenLogin}
        openLogin={openLogin}
        setUser={setUser}
      />
    </>
  );
};

export default AuthDisplay;
