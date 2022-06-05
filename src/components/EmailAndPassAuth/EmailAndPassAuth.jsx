import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase.inti";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
const auth = getAuth(app);

const EmailAndPassAuth = () => {
  // error massager
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  // email state
  const [email, setEmail] = useState("");
  // password state
  const [password, setPassword] = useState("");
  // name state
  const [name, setName] = useState("");

  const handleNameBlur = (event) => {
    setName(event.target.value);
  };

  // handle email blur
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  // // handle password blur
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  // toggle registered or login
  const handleRegisteredChange = (event) => {
    console.log(event.target.checked);
    setRegistered(event.target.checked);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
      return;
    }
    // password validation test At least one special character,
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password should contain at least one special character");
      return;
    }
    setError("");
    setValidated(true);
    console.log("form submit : ", email, password);

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          console.log("login done");
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail(" ");
          setPassword(" ");
          verifyEmail();
          setUserName();
        })
        .catch((error) => {
          console.error(error.code, error.message);
          setError(error.message);
        });
    }

    event.preventDefault();
  };

  const handleForgetPassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("forget password send check email");
    });
  };

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log("updating name")
    }).catch((error) =>{
      console.error(error.message)
      setError(error.message)
    })
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification send");
    }).catch((error) =>{
      console.error(error.message)
      setError(error.message)
    });
  };

  return (
    <div>
      <h4>Email and Password Authentication</h4>

      {/* <form onSubmit={handleFormSubmit}>
        <input onBlur={handleEmail} type="email" name="" placeholder="enter email" />
        <br />
        <input onBlur={handlePassword} type="password" name="" id="" placeholder="password" /><br />
      <input type="submit" value="LogIn" />
      </form> */}

      <div className="w-50 mx-auto border p-5">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <h3 className="text-info">
            Please {registered ? "Login" : "Registered"} !!!
          </h3>

          {  !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name * :</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="text"
              placeholder="Enter your name"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a your name
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address * :</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password * :</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Password
            </Form.Control.Feedback>
          </Form.Group>

          <p className="text-danger">{error}</p>

          <Form.Check
            onChange={handleRegisteredChange}
            label="Already registered? Login"
            type="checkbox"
          />
          <Button onClick={handleForgetPassword} variant="link">
            Forget Password?
          </Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? "Log In" : "Registered"}
          </Button>

          {/* <Button variant="primary" type="submit">
            registered
          </Button> */}
        </Form>
      </div>
    </div>
  );
};

export default EmailAndPassAuth;
