import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../config/firebase.js";
import { toast } from "react-toastify";
const DEFAULT_CAPTION = "No Caption";

const useUploadImages = ({ user, folderName = "images" }) => {
  const [uploadState, setUploadState] = useState({
    caption: "",
    image: null,
    progress: 0,
  });
  const handelChange = (e) => {
    if (e.target.files[0]) {
      setUploadState((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
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
          toast.error("Failed to upload image. Please try again.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const docRef = await addDoc(collection(db, collectionName), {
            const docRef = await addDoc(collection(db, "first-collection"), {
              timestamp: Timestamp.now(),
              user_name: user ? user.displayName ?? "Anonymous" : "Anonymous",
              caption: caption ?? DEFAULT_CAPTION,
              user_name: user?.displayName ?? "Anonymous",
            });
            console.log("Document written with ID: ", docRef.id);
            setUploadState({
              caption: "",
              image: null,
              progress: 0,
            });
            console.log("Image uploaded successfully");
          });
        }
      );
    }
  };
  return {
    handelChange,
    handleUpload,
    progress: uploadState.progress,
    setCaption: (caption) =>
      setUploadState((prevState) => ({ ...prevState, caption })),
  };
};

export default useUploadImages;
