import socket from "./socket";
import { receiveMapInfo, receiveNextPieceInfo, receiveOpponentsMapInfo, receiveUserInfo, receiveUsers, receiveChatMessage, receiveGameEnd, receiveWinState } from "./usersAction.jsx";

export const sendMessage = (message) => {
	return () => {
		socket.emit("chatMessage", { message });
	};
};

export const setupChatListeners = () => {
	return (dispatch) => {
		socket.on("chatMessage", (message) => {
			console.log("chatMessage = " + message);
			dispatch(receiveChatMessage(message));
		});

		return () => {
			socket.off("chatMessage");
		};
	};
};

export const setupUserListeners = () => {
	return (dispatch) => {
		socket.on("usersInRoom", (users) => {
			console.log("usersInRoom = " + users.length);
			dispatch(receiveUsers(users));
		});

		return () => {
			socket.off("usersInRoom");
		};
	};
};

export const setupWinListeners = () => {
	return (dispatch) => {
		socket.on("won", (win) => {
			dispatch(receiveWinState(win));
		});
		return () => {
			socket.off("won");
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
			console.log(map);
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
			console.log("hello it's me");
			console.log(user);
			dispatch(receiveUserInfo(user));
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

export const gameEnd = () => {
	return (dispatch) => {
		socket.on("gameEnd", (data) => {
			dispatch(receiveGameEnd(data));
		});

		return () => {
			socket.off("gameEnd");
		};
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
        return new Promise((resolve, reject) => {
            const handleError = (errorMessage) => {
                console.log("error msg = " + errorMessage);
                reject(errorMessage);
            };

            const handleSuccess = () => {
                resolve();
            };

            socket.once('error', handleError);
            socket.once('success', handleSuccess);

            socket.emit("joinRoom", { room: room, pseudo: pseudo });
        });
    };
};


