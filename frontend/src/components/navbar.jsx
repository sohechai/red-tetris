import logo from "../assets/tetris-logo.svg";
import homeImg from "../assets/home-img.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={logo} alt="Tetris Logo" className="logo" />
      <div className="nav-links">
        <a href="/howto">How to play ?</a>
        <a href="/play" className="game-font">
          PLAY
        </a>
        <a href="/scoreboard">Scoreboard</a>
      </div>
    </div>
  );
};

export default Navbar;
