import socket from "../socket";
import {
	receiveMapInfo,
	receiveNextPieceInfo,
	receiveOpponentsMapInfo,
	receiveUserInfo,
	receiveUsers,
	receiveChatMessage,
	receiveGameEnd,
	receiveWinState,
} from "../usersAction.jsx";
import {
	sendMessage,
	setupChatListeners,
	setupUserListeners,
	setupWinListeners,
	setupMapListeners,
	setupopponentsMapListeners,
	setupNextPieceListeners,
	setupMeInfo,
	startGame,
	gameEnd,
	dropPiece,
	Rotate,
	MoveLeft,
	MoveRight,
	FallByOne,
	joinRoom,
} from "../socketActions.jsx"; // Replace with the actual path
import "@testing-library/jest-dom";


jest.mock("../socket", () => ({
	emit: jest.fn(),
	on: jest.fn(),
	off: jest.fn(),
	once: jest.fn(),
}));

describe("Socket Actions", () => {
	let dispatch;

	beforeEach(() => {
		dispatch = jest.fn();
		jest.clearAllMocks(); // Clear mock data between tests
	});

	it("should emit chatMessage when sendMessage is called", () => {
		sendMessage("Hello world")(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("chatMessage", { message: "Hello world" });
	});

	it("should set up chat listeners and handle incoming messages", () => {
		const unsubscribe = setupChatListeners()(dispatch);

		const mockMessage = "Incoming message";
		expect(socket.on).toHaveBeenCalledWith("chatMessage", expect.any(Function));
		
		const messageHandler = socket.on.mock.calls[0][1];
		messageHandler(mockMessage);
		expect(dispatch).toHaveBeenCalledWith(receiveChatMessage(mockMessage));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("chatMessage");
	});

	it("should emit startGame when startGame is called", () => {
		startGame()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("startGame");
	});

	it("should set up user listeners and handle incoming user data", () => {
		const unsubscribe = setupUserListeners()(dispatch);

		const mockUsers = [{ pseudo: "Alice" }, { pseudo: "Bob" }];
		expect(socket.on).toHaveBeenCalledWith("usersInRoom", expect.any(Function));
		
		const userHandler = socket.on.mock.calls[0][1];
		userHandler(mockUsers);
		expect(dispatch).toHaveBeenCalledWith(receiveUsers(mockUsers));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("usersInRoom");
	});

	// Similar tests for the rest of the actions like setupWinListeners, setupMapListeners, etc.

	it("should emit movePieceLeft when MoveLeft is called", () => {
		MoveLeft()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("movePieceLeft");
	});

	// Add tests for Rotate, MoveRight, FallByOne, dropPiece similarly

	it("should set up map listeners and handle incoming map data", () => {
		const unsubscribe = setupMapListeners()(dispatch);

		const mockMap = { blocks: [] };
		expect(socket.on).toHaveBeenCalledWith("map", expect.any(Function));

		const mapHandler = socket.on.mock.calls[0][1];
		mapHandler(mockMap);
		expect(dispatch).toHaveBeenCalledWith(receiveMapInfo(mockMap));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("map");
	});

	// Add similar tests for setupNextPieceListeners, setupMeInfo, setupopponentsMapListeners, gameEnd, etc.
});
