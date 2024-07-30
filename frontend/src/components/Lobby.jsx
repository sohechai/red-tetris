import { useSelector } from "react-redux";

const Lobby = () => {
  const users = useSelector((state) => state.users.users);

  return (
    <div className="room-lobby">
      <div className="lobby-header">
        <h1>LOBBY</h1>
        <p>{users.length} / 5</p>
      </div>
      <div className="lobby-players">
        {users.map((user, index) => (
          <div className="player-info" key={index}>
            <div className="pseudo">
              {user.pseudo}
              {user.owner === true ? (
                <div className="circle" />
              ) : (
                <div className="circle" style={{ background: "transparent" }} />
              )}

              {/* <img alt="crown" src={crown} /> */}
            </div>
            <div className="score">score : {user.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
