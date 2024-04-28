import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  joinRoom,
  sendMessage,
  setupUserListeners,
} from "../socketActions.jsx";
import { useState } from "react";
// import socket from "../socket.jsx";
const Room = () => {
  const dispatch = useDispatch();
  const [roomName, setRoomname] = useState("");
  const [username, setUsername] = useState("");

  const handleJoinRoom = (e) => {
    dispatch(joinRoom(roomName, username));
  };

  useEffect(() => {
    const cleanup = dispatch(setupUserListeners());

    return () => {
      cleanup();
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
          <a
            href="roomName"
            type="button"
            className="a_button"
            onClick={handleJoinRoom}
          >
            Create / Join Room
          </a>
        </form>
      </div>
    </div>
  );
};

export default Room;
