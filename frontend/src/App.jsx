import "./App.css";
import io from "socket.io-client";
import Navbar from "./components/navbar.jsx";
import Signup from "./components/signup.jsx";
import Login from "./components/login.jsx";
import Home from "./components/home.jsx";
import homeImg from "./assets/tetris-logo.svg";
import Howto from "./components/howto.jsx";
import Scoreboard from "./components/scoreboard.jsx";
import Play from "./components/play.jsx";
import Room from "./components/room.jsx";
import { socket } from "./main.jsx";
import { useEffect } from "react";
function App() {
    useEffect(() => {
      socket.on("error", (error) => {
        console.log(error);
      });
      socket.emit("joinRoom", {room:"room", pseudo:"missaw"})
    }, []);
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
