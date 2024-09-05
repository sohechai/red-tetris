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

	it("should set up map listeners and handle incoming map data", () => {
		const unsubscribe = setupWinListeners()(dispatch);

		const mockMap = { blocks: [] };
		expect(socket.on).toHaveBeenCalledWith("won", expect.any(Function));

		const mapHandler = socket.on.mock.calls[0][1];
		mapHandler(mockMap);
		expect(dispatch).toHaveBeenCalledWith(receiveWinState(mockMap));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("won");
	});
	it("should emit movePieceLeft when MoveLeft is called", () => {
		MoveLeft()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("movePieceLeft");
	});
	it("should emit movePieceLeft when MoveLeft is called", () => {
		MoveRight()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("movePieceRight");
	});
	it("should emit movePieceLeft when MoveLeft is called", () => {
		Rotate()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("rotatePiece");
	});
	it("should emit movePieceLeft when MoveLeft is called", () => {
		FallByOne()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("pieceFallByOne");
	});
	it("should emit movePieceLeft when MoveLeft is called", () => {
		dropPiece()(dispatch);
		expect(socket.emit).toHaveBeenCalledWith("dropPiece");
	});
	// Add tests for , , ,  similarly

	
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

	it("should set up nextPiece listeners and handle incoming map data", () => {
		const unsubscribe = setupNextPieceListeners()(dispatch);

		const mockMap = { blocks: [] };
		expect(socket.on).toHaveBeenCalledWith("nextPiece", expect.any(Function));

		const mapHandler = socket.on.mock.calls[0][1];
		mapHandler(mockMap);
		expect(dispatch).toHaveBeenCalledWith(receiveNextPieceInfo(mockMap));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("map");
	});
	it("should set up me listeners and handle incoming map data", () => {
		const unsubscribe = setupMeInfo()(dispatch);

		const mockMap = { blocks: [] };
		expect(socket.on).toHaveBeenCalledWith("me", expect.any(Function));

		const mapHandler = socket.on.mock.calls[0][1];
		mapHandler(mockMap);
		expect(dispatch).toHaveBeenCalledWith(receiveUserInfo(mockMap));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("usersList");
	});

	it("should set up opponentMapListeners listeners and handle incoming map data", () => {
		const unsubscribe = setupopponentsMapListeners()(dispatch);

		const mockMap = { blocks: [] };
		expect(socket.on).toHaveBeenCalledWith("spectre", expect.any(Function));

		const mapHandler = socket.on.mock.calls[0][1];
		mapHandler(mockMap);
		expect(dispatch).toHaveBeenCalledWith(receiveOpponentsMapInfo(mockMap));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("map");
	});

	it("should set up opponentMapListeners listeners and handle incoming map data", () => {
		const unsubscribe = gameEnd()(dispatch);

		const mockMap = { blocks: [] };
		expect(socket.on).toHaveBeenCalledWith("gameEnd", expect.any(Function));

		const mapHandler = socket.on.mock.calls[0][1];
		mapHandler(mockMap);
		expect(dispatch).toHaveBeenCalledWith(receiveGameEnd(mockMap));

		unsubscribe();
		expect(socket.off).toHaveBeenCalledWith("gameEnd");
	});
});
