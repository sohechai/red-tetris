import { useSelector } from "react-redux";
import logo from "../assets/tetris-logo.svg";
import Game from "./Game.jsx";
import Chat from "./Chat.jsx";
import Lobby from "./Lobby.jsx";
import Settings from "./Settings.jsx";
import NextP from "./NextP.jsx";
import OpponentsMap from "./OpponentsMap.jsx";

const RoomName = () => {
  const me = useSelector((state) => state.me.me);

  return (
    <div className="room-container" id="#room">
      <div className="room-header">
        <img alt="Tetris Logo" className="logo" src={logo} />
      </div>
      <div className="room-content">
        <div className="room-grid">
          <div className="room-grid-header">Room Name : {me.room}</div>
          <div className="room-player">
            <h1 className="h1-red">{me.pseudo}</h1>
            <p>score : {me.score}</p>
          </div>
          <Chat />
          <Game />
          <NextP type="Z" />
          <OpponentsMap />
          <Lobby />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default RoomName;
