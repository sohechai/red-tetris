import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { joinRoom, sendMessage } from "../socketActions.jsx";
import { useState } from "react";
// import socket from "../socket.jsx";
const Room = () => {
  const dispatch = useDispatch();
  const [roomName, setRoomname] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    dispatch({ type: "ApiGotData", data: { room: "roomName" } });
  }, [dispatch]);

  const handleJoinRoom = (e) => {
    // dispatch(sendMessage("test"));
    dispatch(joinRoom(roomName, username));
    // socket.emit("joinRoom", "room1", "pseudo");
  };

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
          <a href="roomName" className="a_button" onClick={handleJoinRoom}>
            Create / Join Room
          </a>
          {/* <button onClick={test}>Create / Join Room</button> */}
        </form>
      </div>
    </div>
  );
};

export default Room;
