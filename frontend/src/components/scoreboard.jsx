import data from "../assets/data/scoreboard.jsx";

const Scoreboard = () => {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard-content">
        <h1 className="game-font">Scoreboard</h1>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              // This is a dummy data, you can replace it with the actual data
              // from the database
              data.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.score}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scoreboard;
