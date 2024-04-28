import { useSelector, useDispatch } from "react-redux";
import socket from "../socket.jsx";
const Room = () => {
  // const socket = useSelector();
  return (
    <div className="room-container" id="#room">
      <div className="room-form">
        <h1>Create / Join Room</h1>
        <form>
          <label htmlFor="room-name">Room Name</label>
          <input type="text" placeholder="Room Name" />
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Username" />
          <a href="roomName" className="a_button">
            Create / Join Room
          </a>
        </form>
      </div>
    </div>
  );
};

export default Room;
