import { Button } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "./firebase.js";

const UploadImages = ({ props }) => {
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
      const uploadTask = uploadBytesResumable(storageRef, image);
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
          uploadTask.snapshot
            .ref("images")
            .getDownloadURL()
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              db.collection("posts").add({
                timestamp: Timestamp.now(),
                caption: caption,
                imageUrl: downloadURL,
                username: props?.user?.displayName,
              });
              setCaption("");
              setImage(null);
              setProgress(0);
              // Save the downloadURL to your database along with the caption
            });
        }
      );
    }
  };
  return (
    <div>
      <progress value={progress} max="100" />
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
