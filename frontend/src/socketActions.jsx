import socket from "./socket";
import { receiveUsers } from "./usersAction.jsx";

export const sendMessage = (message) => {
  return () => {
    socket.emit("message", message);
  };
};

export const setupUserListeners = () => {
  return (dispatch) => {
    socket.on("usersInRoom", (users) => {
      dispatch(receiveUsers(users));
      console.log("users" + users);
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
