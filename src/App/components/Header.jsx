import AuthDisplay from "./AuthDisplay";

const Header = ({ user, setUser, setUserName }) => {
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
