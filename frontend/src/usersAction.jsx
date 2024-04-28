import { RECEIVE_USERS } from "./actionType.jsx";

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  payload: users,
});
