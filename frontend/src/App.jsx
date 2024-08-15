import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Room from "./components/Room.jsx";
import RoomName from "./components/RoomName.jsx";
import Game from "./components/Game.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/room" exact element={<Room />} />
		  <Route path="/:room/:playerName" element={<RoomName />} />
          <Route path="/game" exact element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
