import logo from "../assets/tetris-logo.svg";
import homeImg from "../assets/home-img.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="game-font">TETRIS</h1>
        <img src={homeImg} alt="Tetris" className="home-img" />
        <p>
          Tetris is a tile-matching video game created by Russian software
          engineer Alexey Pajitnov in 1984. It has been published by several
          companies and has been released on a multitude of platforms. In
          Tetris, players must complete lines by moving differently shaped
          pieces (tetrominoes), which descend onto the playing field. The
          completed lines disappear and grant the player points, and the player
          can proceed to fill the vacated spaces. The game ends when the playing
          field is filled. The longer the player can delay this inevitable
          outcome, the higher their score will be.
        </p>
      </div>
    </div>
  );
};

export default Home;
