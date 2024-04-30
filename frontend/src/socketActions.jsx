import socket from "./socket";
import { receiveUserInfo, receiveUsers } from "./usersAction.jsx";

export const sendMessage = (message) => {
  return (dispatch) => {
    socket.emit("message", message);
  };
};

export const setupUserListeners = () => {
  return (dispatch) => {
    socket.on("usersInRoom", (users) => {
      dispatch(receiveUsers(users));
      console.log("usersInRoom = " + users);
    });

    return () => {
      socket.off("usersList");
    };
  };
};

export const setupMeInfo = () => {
  return (dispatch) => {
    socket.on("me", (user) => {
      dispatch(receiveUserInfo(user));
      console.log("me = " + user);
    });

    return () => {
      socket.off("usersList");
    };
  };
};

export const joinRoom = (room, pseudo) => {
  return (dispatch) => {
    socket.emit("joinRoom", { room: room, pseudo: pseudo });
  };
};
