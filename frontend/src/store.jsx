import { createStore, combineReducers, applyMiddleware } from "redux";
import { RECEIVE_USERS } from "./actionType.jsx";
import { RECEIVE_USER_INFO } from "./actionType.jsx";
import { thunk as thunkMiddleware } from "redux-thunk";

const initialState = {
  users: [],
  me: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_USER_INFO:
      return {
        ...state,
        me: action.payload,
      };
    default:
      return state;
  }
};

const messageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages: messageReducer,
  users: userReducer,
  me: meReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
