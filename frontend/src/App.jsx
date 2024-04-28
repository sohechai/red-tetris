import "./App.css";
import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import io from "socket.io-client";
import Play from "./components/Play.jsx";
import Room from "./components/Room.jsx";
import RoomName from "./components/RoomName.jsx";
import logo from "./assets/tetris-logo.svg";

const socket = io("http://localhost:4001", { transports: ["websocket"] });

function App() {
  return (
    <>
      <BrowserRouter>
        <img alt="Tetris Logo" className="logo" src={logo} />
        {/* <NavLink to="/room"> */}
        {/* <Play /> */}
        {/* </NavLink> */}
        <Routes>
          <Route path="/" exact element={<Play />} />
          <Route path="/room" exact element={<Room />} />
          <Route path="/roomName" exact element={<RoomName />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
