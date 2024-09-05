import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk as thunkMiddleware } from "redux-thunk";

const userInitialState = { users: [] };
const meInitialState = { me: [] };
const mapInitialState = { map: [] };
const nextPieceInitialState = { nextPiece: [] };
const opponentsMapInitialState = { opponentsMap: [] };
const chatInitialState = { messages: [] };
const gameStateInitialState = { isGameEnded: false };
const winInitialState = {win: undefined};
const isGameLaunched = { isGameLaunched: false };

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_USERS":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const meReducer = (state = meInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_USER_INFO":
      return { ...state, me: action.payload };
    default:
      return state;
  }
};

const mapReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_MAP_INFO":
      return { ...state, map: action.payload };
    default:
      return state;
  }
};

const nextPieceReducer = (state = nextPieceInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_PIECE_INFO":
      return { ...state, nextPiece: action.payload };
    default:
      return state;
  }
};

const opponentsMapReducer = (state = opponentsMapInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_OPMAP_INFO":
      return { ...state, opponentsMap: action.payload };
    default:
      return state;
  }
};

const chatReducer = (state = chatInitialState, action) => {
  switch (action.type) {
    case "RECEIVE_CHAT_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

const gameStateReducer = (state = gameStateInitialState, action) => {
  switch (action.type) {
    case 'GAME_END':
      return { ...state, isGameEnded: action.payload };
    default:
      return state;
  }
};

const winStateReducer = (state = winInitialState, action) => {
  switch (action.type) {
    case 'WIN':
      return { ...state, win: action.payload };
    default:
      return state;
  }
};

const isGameLaunchedReducer = (state = isGameLaunched, action) => {
  switch (action.type) {
    case 'GAME_LAUNCHED':
      return { ...state, isGameLaunched: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  users: userReducer,
  me: meReducer,
  map: mapReducer,
  nextPiece: nextPieceReducer,
  opponentsMap: opponentsMapReducer,
  messages: chatReducer,
  gameState: gameStateReducer,
  win: winStateReducer,
  isGameLaunched: isGameLaunchedReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
