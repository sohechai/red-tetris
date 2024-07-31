import { RECEIVE_USERS } from "./actionType.jsx";
import { RECEIVE_USER_INFO } from "./actionType.jsx";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});

export const receiveUserInfo = (userInfo) => ({
  type: RECEIVE_USER_INFO,
  payload: userInfo,
});

export const receiveMapInfo = (map) => ({
  type: "RECEIVE_MAP_INFO",
  payload: map,
});

export const receiveNextPieceInfo = (piece) => ({
  type: "RECEIVE_PIECE_INFO",
  payload: piece,
});
