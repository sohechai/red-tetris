import { useNavigate } from "react-router-dom";
import logo from "../assets/tetris-logo.svg";
const play = () => {
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/room`);
  };

  return (
    <div className="parent-container">
      <img alt="Tetris Logo" className="logo" src={logo} id="play-logo" />
      <button onClick={handleClick}>PLAY</button>
    </div>
  );
};

export default play;
