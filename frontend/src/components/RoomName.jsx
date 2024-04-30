import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupUserListeners } from "../socketActions";

const RoomName = () => {
  const users = useSelector((state) => state.users.users);
  const me = useSelector((state) => state.me.me);

  return (
    // <div className="room-container" id="#room">
    // <h1>Room Name</h1>
    <div className="room-grid"></div>
  );
};

export default RoomName;
