import { Logger } from '@nestjs/common';
import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Game } from 'src/manager/game.manager';
import { SelectGameMode } from 'src/manager/lobby.manager';
import {
	CheckIfUserIsUnique,
	GetUserListFromPlayers,
	HandleChatMessage,
	RegisterUser,
	RemoveUser,
} from 'src/manager/users.manager';
import { Player } from 'src/model/player';

@WebSocketGateway(4001)
export class AppGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	private wss: Server;
	private logger: Logger = new Logger('AppGateway');
	private players: Player[] = [];

	afterInit(server: Server) {
		this.logger.log('Initialized!');
	}

	// TODO : il faut que quand un client se deconnecte redefinir le boolean du owner si c'etait le owner
	// et renvoyer la liste des users a toute la room sans le client qui vient de se deconnecter
	handleDisconnect(client: Socket): void {
		if (this.players.length && this.players.filter((player) => player.user.client.id === client.id).length) {
			let room = this.players.filter((player) => player.user.client.id === client.id)[0].user.room;
			this.players = RemoveUser(this.players, client);
			this.wss.to(room).emit("usersInRoom", GetUserListFromPlayers(this.players));
		}
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	handleConnection(client: Socket): void {
		this.logger.log(`Client connected: ${client.id}`);
	}

	@SubscribeMessage('startGame')
	async handleGameStart(client: Socket): Promise<void> {
		this.logger.log(`Client started game: ${client.id}`);
		const room = this.players[this.players.findIndex(player => player.user.client.id === client.id)].user.room;
		if (this.players[this.players.findIndex(player => player.user.client.id === client.id)].user.owner === true) {
			const game: Game = new Game(this.players, Player.getRoomBySocketId(this.players, client), this.wss);
			this.wss.to(room).emit("gameLaunched", true);
			this.wss.to(room).emit("gameEnd", false);
			await game.start();
			this.wss.to(room).emit("gameEnd", true);
			this.wss.to(room).emit("gameLaunched", false);
		}
	}

	@SubscribeMessage('selectGameMode')
	handleSelectGameMode(client: Socket, data: { gameMode: number }): void {
		this.logger.log(
			`Client : ${client.id} selected game mode: ${data.gameMode}`,
		);
		this.players = SelectGameMode(this.players, data.gameMode, client);
	}

	@SubscribeMessage('pieceFallByOne')
	handlePieceFallByOne(client: Socket): void {
		const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
		if (player.indexOfBag >= 0)
			this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.dropOne(player.bag[player.indexOfBag], client, this.wss);
		// this.players[this.players.findIndex(player => player.user.client.id === client.id)].bag[this.players[this.players.findIndex(player => player.user.client.id === client.id)].indexOfBag].rotateRight();
	}

	@SubscribeMessage('rotatePiece')
	handleRotatePiece(client: Socket): void {
		const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
		if (player.indexOfBag >= 0)
			this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.rotatePiece(player.bag[player.indexOfBag], client, this.wss);
		// this.players[this.players.findIndex(player => player.user.client.id === client.id)].bag[this.players[this.players.findIndex(player => player.user.client.id === client.id)].indexOfBag].rotateRight();
	}

	@SubscribeMessage('movePieceRight')
	handleMovePieceRight(client: Socket): void {
		const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
		if (player && player.indexOfBag >= 0)
			player.map.movePiece(player.bag[player.indexOfBag], 1, client, this.wss);
	}

	@SubscribeMessage('movePieceLeft')
	handleMovePieceLeft(client: Socket): void {
		const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
		if (player && player.indexOfBag >= 0)
			this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.movePiece(player.bag[player.indexOfBag], -1, client, this.wss);
	}

	@SubscribeMessage('dropPiece')
	handleDropPiece(client: Socket): void {
		const player: Player = this.players[this.players.findIndex(player => player.user.client.id === client.id)];
		if (player && player.indexOfBag >= 0)
			this.players[this.players.findIndex(player => player.user.client.id === client.id)].map.dropPiece(player.bag[player.indexOfBag], client, this.wss);
	}
	@SubscribeMessage('joinRoom')
	handleJoinRoom(client: Socket, data: { room: string, pseudo: string }): void {
		if (CheckIfUserIsUnique(this.players, data.pseudo) === 1) {
			client.emit("error", "Username already exists");
			this.logger.log(`Error: Username already exists`);
		}
		else {
			if (this.players.filter((player) => player.user.room === data.room).length > 4) {
				client.emit("error", "Room is full");
				this.logger.log(`Error: Room is full`);
			}
			else {
				this.players = RegisterUser(this.players, data.pseudo, data.room, client, this.wss);
				this.logger.log(`Client joined room: ${data.room} with pseudo : ${data.pseudo}`);
				client.emit("success");
			}
		}
	}

	@SubscribeMessage('chatMessage')
	handleChatMessage(client: Socket, data: { message: string }): void {
		HandleChatMessage(this.players, client, data.message, this.wss);
	}
}
