function Game() {
  const cells = Array.from({ length: 200 }).map((_, index) => (
    <div key={index}></div>
  ));

  return <div className="game-grid">{cells}</div>;
}

export default Game;
