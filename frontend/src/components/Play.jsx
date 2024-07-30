import { useNavigate } from "react-router-dom";


const play = () => {
  let navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/room`);
  };

  return (
    <div className="parent-container">
      <button onClick={handleClick}>PLAY</button>
    </div>
  );
};

export default play;
