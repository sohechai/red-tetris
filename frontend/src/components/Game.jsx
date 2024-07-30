import { useDispatch } from "react-redux";

function Game() {

  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyPress = (e) => {
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
    }
    window.addEventListener('keydown', handleKeyPress);
  }, []);

  
  // const grid = [
  //   ["X", "X", "X", "T", "T", "T", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "T", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "S", "X"],
  //   ["X", "X", "X", "X", "X", "X", "X", "X", "S", "S"],
  //   ["X", "X", "L", "Z", "X", "X", "J", "J", "J", "S"],
  //   ["L", "L", "L", "Z", "Z", "X", "X", "J", "O", "O"],
  //   ["I", "I", "I", "I", "Z", "X", "X", "J", "O", "O"],
  // ];

  return (
    <div className="room-game">
      <div className="game-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${cell}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
