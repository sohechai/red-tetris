import logo from "../assets/tetris-logo.svg";
import homeImg from "../assets/home-img.png";

const play = () => {
  return (
    <div className="parent-container">
      <img src={logo} alt="Tetris Logo" className="logo" />
      <h1>Room : room_name</h1>
      <div className="play-container">
        <h1>Players : player1</h1>
        {/* <img src={homeImg} alt="Tetris" className="home-img" /> */}
        <div className="game-window">GAME WINDOW</div>
        <h1>Players : player2</h1>
      </div>
    </div>
  );
};

export default play;
