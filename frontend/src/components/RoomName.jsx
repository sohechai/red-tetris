import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupUserListeners } from "../socketActions";
import sendButton from "../assets/send.svg";
import logo from "../assets/tetris-logo.svg";
import crown from "../assets/crown.svg";
import Game from "./Game.jsx";

const RoomName = () => {
  const users = useSelector((state) => state.users.users);
  const me = useSelector((state) => state.me.me);
  // const messages = useSelector((state) => state.messages.messages);
  const messages = [
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
    {
      pseudo: "toto",
      message: "salut",
    },
  ];

  const sendMessage = () => {
    console.log("send message");
  };

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
          <div className="room-chat">
            <h1 className="h1-header">CHAT</h1>
            <div className="chat-messages">
              {messages.map((message) => (
                <div className="chat-message">
                  {message.pseudo} : {message.message}
                </div>
              ))}
            </div>
            <div className="input-container">
              <input type="text" placeholder="message" />
              <img src={sendButton} alt="send" onClick={sendMessage} />
            </div>
          </div>
          <div className="room-game">
            <Game />
          </div>
          <div className="room-grid-middle-right-header">NEXT PIECE</div>
          <div className="room-grid-middle-right-content">ENNEMIES MAPS</div>
          <div className="room-lobby">
            <div className="lobby-header">
              <h1>LOBBY</h1>
              <p>{users.length} / 5</p>
            </div>
            <div className="lobby-players">
              {users.map((user) => (
                <div className="player-info">
                  <div className="pseudo">
                    {user.pseudo}
                    <div className="circle" />
                    {/* <img alt="crown" src={crown} /> */}
                  </div>
                  <div className="score">score : {user.score}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="room-settings">
            <h1 className="h1-header">GAME MODES</h1>

            {me.owner ? (
              <>
                <div className="settings-buttons">
                  <button>INIVISIBLE</button>
                  <button>GRAVITY</button>
                  <button>MODE 3</button>
                </div>
                <div className="play-button">
                  <button type="button">PLAY</button>
                </div>
              </>
            ) : (
              <div className="not-owner">
                <p>Waiting for the owner to start the game</p>
              </div>
            )}
          </div>
        </div>
        {/* {users.map((user) => (
        <div key={user.pseudo}>
          {user.pseudo} - {user.score}
        </div>
      ))} */}
      </div>
    </div>
  );
};

export default RoomName;
