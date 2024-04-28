import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupUserListeners } from "../socketActions";

const RoomName = () => {
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();
  useEffect(() => {
    const cleanup = dispatch(setupUserListeners());
    console.log("users = " + users);
    return () => {
      cleanup();
    };
  }, [dispatch]);

  return (
    <div className="room-container" id="#room">
      GAMEEE
    </div>
  );
};

export default RoomName;
