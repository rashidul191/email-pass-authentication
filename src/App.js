import "./App.css";
import EmailAndPassAuth from "./components/EmailAndPassAuth/EmailAndPassAuth";
import GitHubSignIn from "./components/GitHubSignIn/GitHubSignIn";
import GoogleSignIn from "./components/GoogleSignIn/GoogleSignIn";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookLogin from "./components/FacebookLogin/FacebookLogin";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <h1>Email and Password Authentication</h1>
      <GoogleSignIn></GoogleSignIn>
      <GitHubSignIn></GitHubSignIn>
      <EmailAndPassAuth></EmailAndPassAuth>
      <FacebookLogin></FacebookLogin>
    </div>
  );
}

export default App;
