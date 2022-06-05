import React, { useState } from "react";
import app from "../../firebase.inti";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const GoogleSignIn = () => {
  const [user, setUser] = useState({});
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error kahici :", error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.error("Error kahici :", error);
      });
  };
  return (
    <div>
        <h4>Google Authentication</h4>
      {user.uid ? (
          <button onClick={handleSignOut}>Sign Out</button>
        
      ) : (
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      )}

      <div>
        <h3>Name: {user.displayName}</h3>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
    </div>
  );
};

export default GoogleSignIn;
