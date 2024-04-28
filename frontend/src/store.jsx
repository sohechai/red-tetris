import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk"; // Modification ici

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
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
