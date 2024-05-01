import { useSelector } from "react-redux";
import logo from "../assets/tetris-logo.svg";
import Game from "./Game.jsx";
import Chat from "./Chat.jsx";
import Lobby from "./Lobby.jsx";
import Settings from "./Settings.jsx";

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
          <div className="room-grid-middle-right-header">NEXT PIECE</div>
          <div className="room-grid-middle-right-content">ENNEMIES MAP</div>
          <Lobby />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default RoomName;
