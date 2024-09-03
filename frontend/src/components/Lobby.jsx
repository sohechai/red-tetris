import { useEffect } from "react";
import { useSelector } from "react-redux";

const Lobby = () => {
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
  }, [users]);

  return (
    <div className="room-lobby">
      <div className="lobby-header">
        <h1 data-testid="lobby-title">LOBBY</h1>
        <p data-testid="user-count">{users.length} / 5</p>
      </div>
      <div className="lobby-players">
        {users.map((user, index) => (
          <div className="player-info" key={index} data-testid={`player-${index}`}>
            <div className="pseudo">
              <span data-testid={`player-pseudo-${index}`}>{user.pseudo}</span>
              {user.owner === true ? (
                <div className="circle" data-testid={`player-owner-${index}`} />
              ) : (
                <div className="circle" style={{ background: "transparent" }} data-testid={`player-no-owner-${index}`} />
              )}
            </div>
            <div className="score" data-testid={`player-score-${index}`}>score : {user.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
