export const receiveUsers = (users) => ({
	type: "RECEIVE_USERS",
	payload: users,
});

export const receiveUserInfo = (userInfo) => ({
	type: "RECEIVE_USER_INFO",
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

export const receiveOpponentsMapInfo = (opponentsMap) => ({
	type: "RECEIVE_OPMAP_INFO",
	payload: opponentsMap,
});

export const receiveChatMessage = (message) => ({
	type: 'RECEIVE_CHAT_MESSAGE',
	payload: message,
});

export const receiveGameEnd = (isGameEnded) => ({
	type: 'GAME_END',
	payload: isGameEnded,
});

export const receiveWinState = (win) => ({
	type: 'WIN',
	payload: win,
});


export const receiveIsGameLaunched = (isGameLaunched) => ({
	type: 'GAME_LAUNCHED',
	payload: isGameLaunched,
});


