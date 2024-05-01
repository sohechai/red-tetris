import { useSelector } from "react-redux";

const Settings = () => {
  const me = useSelector((state) => state.me.me);

  return (
    <div className="room-settings">
      <h1 className="h1-header">GAME MODES</h1>

      {me.owner ? (
        <>
          <div className="settings-buttons">
            <button>DEFAULT</button>
            <button>INIVISIBLE</button>
            <button>GRAVITY</button>
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
  );
};

export default Settings;
