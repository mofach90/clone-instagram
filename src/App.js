import "./App.css";
import Post from "./post.js";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="headerImage"
          className="app__headerImage"
        />
      </div>
      <h1>Welcome to React </h1>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
