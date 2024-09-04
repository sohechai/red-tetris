import { useEffect } from "react";

function Game(props) {
  const map = props.map;

  useEffect(() => {
    
  }, [])

  return (
    <div className="room-game">
      <div className="game-container">
        {map? map.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell}`} />
            ))}
          </div>
        )): null}
      </div>
    </div>
  );
}

export default Game;
