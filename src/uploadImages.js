import { Button } from "@mui/material";
import React, { useState } from "react";
import { storage } from "./firebase.js";
import { ref } from "firebase/storage";

const UploadImages = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handelChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    if (!image) {
      alert("Please select an image to upload");
      return;
    } else {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = storageRef.put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
        },
        () => {
          uploadTask.snapshot.ref("images").getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            // Save the downloadURL to your database along with the caption
          });
        }
      );
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your Caption ..."
        onChange={(e) => setCaption(e.target.text)}
      />
      <input type="file" onChange={handelChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default UploadImages;
