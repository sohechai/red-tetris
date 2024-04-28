import "./App.css";
import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store.jsx";
import io from "socket.io-client";
import Play from "./components/Play.jsx";
import Room from "./components/Room.jsx";
import RoomName from "./components/RoomName.jsx";
import logo from "./assets/tetris-logo.svg";

function App() {
  return (
    <>
      <BrowserRouter>
        <img alt="Tetris Logo" className="logo" src={logo} />
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
