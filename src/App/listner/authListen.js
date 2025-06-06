import { auth } from "../../config/firebase.js";
import { onAuthStateChanged, updateProfile } from "firebase/auth";



export  const authenticationListner = onAuthStateChanged(auth, (user, userName, setUser) => {
    if (user) {
      setUser(user);
      if (user.displayName) {
        // that means , user has a profile, nothing to do
      } else {
        // that means user signed up for the first time so i need to update his displayName 
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            console.log("Profile updated:", userName);
          })
          .catch((error) => {
            console.log("Error updating profile:", error);
          });
      }
    } else {
      setUser(null);
    }
  });

    



