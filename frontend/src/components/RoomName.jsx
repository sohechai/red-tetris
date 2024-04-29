import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupUserListeners } from "../socketActions";
import socket from "../socket";

const RoomName = () => {
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    console.log("users = " + users);
  }, [users]);

  return (
    <div className="room-container" id="#room">
      GAMEEE
    </div>
  );
};

export default RoomName;
