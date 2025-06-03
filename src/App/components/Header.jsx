import { useState } from "react";
import "../App.css";
import AuthDisplay from "./AuthDisplay";
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

const Header = ({ user, setUser, userName, setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="app__header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="headerImage"
        className="app__headerImage"
      />
      <AuthDisplay user={user} setUser={setUser} setUserName={setUserName} />
    </div>
  );
};

export default Header;
