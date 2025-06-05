import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("my-app-root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
