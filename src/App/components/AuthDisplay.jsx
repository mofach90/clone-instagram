import { Button } from "@mui/material";
import { useState } from "react";
import { auth } from "../../firebase";
import "../App.css";
import LoginDisplay from "./LoginDisplay";
import SignupDisplay from "./SignupDisplay";

const AuthDisplay = ({ user, setUser, setUserName }) => {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const signOut = () => {
    auth.signOut().catch((error) => {
      console.log("Error signing out:", error);
    });
    console.log("Sign Out");
  };

  return (
    <>
      {user ? (
        <Button onClick={signOut}>LOGOUT</Button>
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
