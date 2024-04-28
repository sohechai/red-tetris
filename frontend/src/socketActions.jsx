import socket from "./socket";

export const sendMessage = (message) => {
  return (dispatch) => {
    socket.emit("message", message);
    console.log("message sent");
  };
};

export const setupSocketListeners = () => {
  return (dispatch) => {
    socket.on("message", (message) => {
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: message,
      });
    });
  };
};

export const joinRoom = (room, pseudo) => {
  return (dispatch) => {
    socket.emit("joinRoom", room, pseudo);
  };
};
