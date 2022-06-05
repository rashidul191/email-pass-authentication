import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase.inti";

const auth = getAuth(app);
const FacebookLogin = () => {
  const [user, setUser] = useState({});
  const facebookProvider = new FacebookAuthProvider();

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user)
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <div>
      <h4>Facebook Login !!</h4>
     {user.uid? <button onClick={handleFacebookLogin}>Sign Out</button> : <button onClick={handleFacebookLogin}>Facebook Login</button>}
      <h4>Name : {user.displayName}</h4>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
};

export default FacebookLogin;
