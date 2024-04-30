import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  joinRoom,
  setupMeInfo,
  setupUserListeners,
} from "../socketActions.jsx";
import { useState } from "react";

const Room = () => {
  const users = useSelector((state) => state.users.users);
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [roomName, setRoomname] = useState("");
  const [username, setUsername] = useState("");

  const handleJoinRoom = (e) => {
    e.preventDefault();
    dispatch(joinRoom(roomName, username));
    navigate(`/RoomName`);
  };

  useEffect(() => {
    const cleanup = dispatch(setupUserListeners());
    const cleanup2 = dispatch(setupMeInfo());

    return () => {
      cleanup();
      cleanup2();
    };
  }, [dispatch]);

  return (
    <div className="room-container" id="#room">
      <div className="room-form">
        <h1>Create / Join Room</h1>
        <form>
          <label htmlFor="room-name">Room Name</label>
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoomname(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" onClick={handleJoinRoom}>
            Create / Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Room;
