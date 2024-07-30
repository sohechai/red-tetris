import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MoveLeft, MoveRight, Rotate, startGame } from "../socketActions.jsx";

const RoomName = () => {
  const users = useSelector((state) => state.users.users);
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
  useEffect(() => {
    console.log("users = " + users);
  }, [users]);

  const handleStartGame = (e) => {
    e.preventDefault();
    dispatch(startGame());
  };
  return (
    <div className="room-container" id="#room">
      <button onClick={handleStartGame}></button>

      GAMEEE
    </div>
  );
};

export default RoomName;
