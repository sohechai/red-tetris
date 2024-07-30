import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  startGame } from "../socketActions.jsx";
import { useSelector } from "react-redux";
import logo from "../assets/tetris-logo.svg";
import Game from "./Game.jsx";
import Chat from "./Chat.jsx";
import Lobby from "./Lobby.jsx";
import Settings from "./Settings.jsx";
import NextP from "./NextP.jsx";
import OpponentsMap from "./OpponentsMap.jsx";
import { useNavigate } from "react-router-dom";

const RoomName = () => {
  const me = useSelector((state) => state.me.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("users = " + users);
  }, [users]);
  const handleStartGame = (e) => {
    e.preventDefault();
    console.log("here");
    dispatch(startGame());
    navigate(`/game`);
  };
  return (
    <div className="room-container" id="#room">
      <button onClick={handleStartGame}>START</button>

      GAMEEE
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
