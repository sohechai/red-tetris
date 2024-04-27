import "./App.css";
import Navbar from "./components/navbar.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Home from "./components/home.jsx";
import homeImg from "./assets/tetris-logo.svg";
import Howto from "./components/howto.jsx";
import Scoreboard from "./components/scoreboard.jsx";

function App() {
  return (
    <>
      <Navbar />
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      <Howto />
      {/* <Scoreboard /> */}
    </>
  );
}

export default App;
