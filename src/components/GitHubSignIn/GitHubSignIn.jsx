import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase.inti";

const GitHubSignIn = () => {
  const [user, setUser] = useState({});
  const auth = getAuth(app);
  const gitHubProvider = new GithubAuthProvider();
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error kahici : ", error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.error("Error khaici: ", error);
      });
  };

  return (
    <div>
      <h4>GitHub Authentication</h4>
    {user.uid ?<button onClick={handleSignOut}>Sign Out</button>
      :<button onClick={handleGitHubSignIn}>GitHub Sign In</button>}

      <div>
          <h3>Name: {user.displayName}</h3>
          <p>Email: {user.email}</p>
          <img width={100} src={user.photoURL} alt="" />
      </div>
    </div>
  );
};

export default GitHubSignIn;
