import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../config/firebase.js";
import { toast } from "react-toastify";
const useUploadImages = ({ user, folderName = "images" }) => {
const useUploadImages = ({ user }) => {
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
      toast.error("Please select an image to upload");
      return;
      const storageRef = ref(storage, `${folderName}/${image.name}`);
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
              user_name: user?.displayName ?? "Anonymous",
            });
            console.log("Document written with ID: ", docRef.id);
            setCaption("");
            setImage(null);
            setProgress(0);
            console.log("Image uploaded successfully");
          });
        }
      );
    }
  };
  return { handelChange, handleUpload, progress, setCaption };
};

export default useUploadImages;
