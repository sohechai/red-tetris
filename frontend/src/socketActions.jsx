import socket from "./socket";
import { receiveMapInfo, receiveUserInfo, receiveUsers } from "./usersAction.jsx";

export const sendMessage = (message) => {
  return () => {
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

export const setupMapListeners = () => {
  return (dispatch) => {
    socket.on("map", (map) => {
      dispatch(receiveMapInfo(map));
      console.log("map = " + map);
    });

    return () => {
      socket.off("map");
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

export const startGame = () => {
  return () => {
    socket.emit("startGame");
  };
};

export const Rotate = () => {
  return () => {
    socket.emit("rotatePiece");
  };
};


export const MoveLeft = () => {
  return () => {
    socket.emit("movePieceLeft");
  };
};

export const MoveRight = () => {
  return () => {
    socket.emit("movePieceRight");
  };
};

export const joinRoom = (room, pseudo) => {
  return () => {
    socket.emit("joinRoom", { room: room, pseudo: pseudo });
  };
};
