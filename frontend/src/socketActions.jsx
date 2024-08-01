import socket from "./socket";
import { receiveMapInfo, receiveNextPieceInfo, receiveOpponentsMapInfo, receiveUserInfo, receiveUsers } from "./usersAction.jsx";

export const sendMessage = (message) => {
  return () => {
    socket.emit("message", message);
  };
};

export const setupUserListeners = () => {
  return (dispatch) => {
    socket.on("usersInRoom", (users) => {
      console.log("usersInRoom = " + users);
      dispatch(receiveUsers(users));
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
    });

    return () => {
      socket.off("map");
    };
  };
};

export const setupopponentsMapListeners = () => {
  return (dispatch) => {
    socket.on("spectre", (map) => {
      dispatch(receiveOpponentsMapInfo(map));
    });

    return () => {
      socket.off("map");
    };
  };
};

export const setupNextPieceListeners = () => {
  return (dispatch) => {
    socket.on("nextPiece", (nextPiece) => {
      dispatch(receiveNextPieceInfo(nextPiece));
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

export const dropPiece = () => {
  return () => {
    socket.emit("dropPiece");
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

export const FallByOne = () => {
  return () => {
    socket.emit("pieceFallByOne");
  };
};

export const joinRoom = (room, pseudo) => {
  return () => {
    socket.emit("joinRoom", { room: room, pseudo: pseudo });
  };
};
