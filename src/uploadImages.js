import { Button } from "@mui/material";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "./firebase.js";
import "./uploadImage.css";

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
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            const docRef = await addDoc(collection(db, "first-collection"), {
              timestamp: Timestamp.now(),
              caption: caption ?? "No Caption",
              image_url: downloadURL,
              user_name: props?.userName ?? "Anonymous",
            });
            console.log("Document written with ID: ", docRef.id);
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
  );
};

export default UploadImages;
