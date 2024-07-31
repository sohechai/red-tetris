import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  dropPiece, MoveLeft, MoveRight, Rotate, setupNextPieceListeners, startGame } from "../socketActions.jsx";
import logo from "../assets/tetris-logo.svg";
import Game from "./Game.jsx";
import Chat from "./Chat.jsx";
import Lobby from "./Lobby.jsx";
import Settings from "./Settings.jsx";
import NextP from "./NextP.jsx";
import OpponentsMap from "./OpponentsMap.jsx";

const RoomName = () => {
  const me = useSelector((state) => state.me.me);
  // const piece = useSelector((state) => state.piece.piece);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setupNextPieceListeners);
    const handleKeyPress = (e) => {
      console.log(e.key);
      e.preventDefault();
      if (e.key == 'd') {
        console.log(e.key);
        dispatch(MoveRight())
      }
      if (e.key == 'a') {
        console.log(e.key);
        dispatch(MoveLeft());
      }
      if (e.key == 'r') {
        console.log(e.key);
        dispatch(Rotate());
      }
      if (e.key == 'ArrowDown') {
        console.log(e.key);
        dispatch(dropPiece());
      }
    }
    window.addEventListener('keydown', handleKeyPress);
  }, []);
  const handleStartGame = (e) => {
    e.preventDefault();
    dispatch(startGame());
  };
  return (
    <div className="room-container" id="#room">
      <div className="room-header">
        <img alt="Tetris Logo" className="logo" src={logo} />
      </div>
        <button onClick={handleStartGame}>START</button>
      <div className="room-content">
        <div className="room-grid">
          <div className="room-grid-header">Room Name : {me.room}</div>
          <div className="room-player">
            <h1 className="h1-red">{me.pseudo}</h1>
            <p>score : {me.score}</p>
          </div>
          <Chat />
          <Game />
          <NextP type={ "T" } />
          <OpponentsMap />
          <Lobby />
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default RoomName;
