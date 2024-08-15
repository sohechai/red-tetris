import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setupMapListeners } from "../socketActions";

function Game() {
  const map = useSelector((state) => state.map.map);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setupMapListeners());
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
