import "./App.css";
import socketIO from "socket.io-client";
import Navbar from "./components/navbar.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Home from "./components/home.jsx";
import homeImg from "./assets/tetris-logo.svg";
import Howto from "./components/howto.jsx";
import Scoreboard from "./components/scoreboard.jsx";
import Play from "./components/play.jsx";
import Room from "./components/room.jsx";

const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <Howto /> */}
      {/* <Scoreboard /> */}
      <Room />
      {/* <Play /> */}
    </>
  );
}

export default App;
