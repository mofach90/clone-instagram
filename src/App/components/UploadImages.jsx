import { Button } from "@mui/material";
import React from "react";
import "../../styles/uploadImages.css";
import  useUploadImages  from "../hooks/useUploadImages.js";

const UploadImages = ({ user }) => {
  const { handelChange, handleUpload, progress, setCaption } = useUploadImages({ user });
  return (
    <>
      {user?.displayName ? (
        <div className="upload__images">
          <progress className="progress__bar" value={progress} max="100" />
          <input
            type="text"
            placeholder="Enter your Caption ..."
            onChange={(e) => setCaption(e.target.value)}
          />
          <input type="file" onChange={handelChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            border: "solid 2px red ",
            width: "20%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "40px",
            padding: "3px",
          }}
        >
          "Please login first"
        </div>
      )}
    </>
  );
};

export default UploadImages;
