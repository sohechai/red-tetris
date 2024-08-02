import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { startGame } from "../socketActions";

const Settings = () => {
  const me = useSelector((state) => state.me.me);
  const dispatch = useDispatch();
  const [selectedMode, setSelectedMode] = useState("");

  const handleButtonClick = (mode) => {
    setSelectedMode(mode);
    // socket.emit('changeMode', mode);
    console.log("change mode");
  };

  const launchGame = () => {
    dispatch(startGame());
    console.log("launch game");
  };

  return (
    <div className="room-settings">
      <h1 className="h1-header">GAME MODE</h1>

      {me.owner ? (
        <>
          <div className="settings-buttons">
            <button
              className={selectedMode === "DEFAULT" ? "selected" : ""}
              onClick={() => handleButtonClick("DEFAULT")}
            >
              DEFAULT
            </button>
            <button
              className={selectedMode === "INVISIBLE" ? "selected" : ""}
              onClick={() => handleButtonClick("INVISIBLE")}
            >
              INVISIBLE
            </button>
            <button
              className={selectedMode === "GRAVITY" ? "selected" : ""}
              onClick={() => handleButtonClick("GRAVITY")}
            >
              GRAVITY
            </button>
          </div>
          <div className="play-button">
            <button type="button" onClick={launchGame}>
              PLAY
            </button>
          </div>
        </>
      ) : (
        <div className="not-owner">
          <p>Waiting for the owner to start the game</p>
          {selectedMode && <p>{selectedMode}</p>}
        </div>
      )}
    </div>
  );
};

export default Settings;
