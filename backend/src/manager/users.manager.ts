import { Server, Socket } from 'socket.io';
import { UserInfo } from 'src/interface/user';
import { Player } from 'src/model/player';
import { Map } from './map.manager';

export function CheckIfUserIsUnique(players: Player[], pseudo: string): number {
	for (let player of players) {
		if (player.user.pseudo === pseudo) return 1; // 1 = error user already exist
	}
	return 0;
}

export function RemoveUser(player: Player[], client: Socket) {
	player = player.filter((player) => player.user.client.id !== client.id);
	return player;
}

function SendNewUsersInRoom(players: Player[], pseudo: string, client: Socket, room: string, server: Server) {
	const usersInRoom: { pseudo: string, score: number, owner: boolean }[] = [];
	const me: UserInfo = players[players.findIndex(player => player.user.pseudo === pseudo)].me();

	for (let player of players) {
		if (player.user.room === room)
			usersInRoom.push({ pseudo: player.user.pseudo, score: player.user.score, owner: player.user.owner });
	}
	// console.log("USERS IN ROOM :");
	// console.log(usersInRoom);
	// console.log("_____________________\n");
	// console.log("ME :");
	// console.log(me)
	server.to(room).emit("usersInRoom", usersInRoom);
	client.emit("me", me);
}

function RoomAlreadyExist(players: Player[], room: string): boolean {
	if (players.findIndex((player) => player.user.room === room) !== -1) return true;
	return false;
}

export function RegisterUser(
	players: Player[],
	pseudo: string,
	room: string,
	client: Socket,
	server: Server,
): Player[] {
  players.push(new Player(
    pseudo,
    client,
    room,
    RoomAlreadyExist(players, room) ? players[players.findIndex(player => player.user.owner === true)].user.gameMode : 1,
    RoomAlreadyExist(players, room) ? false : true,
    new Map(),
    0
  ));
  client.join(room);
  SendNewUsersInRoom(players, pseudo, client, room, server);
  return players;
}

export function GetUserListFromPlayers(players: Player[]) {
  const usersInRoom: { pseudo: string, score: number, owner: boolean }[] = [];
  for (let player of players) {
      usersInRoom.push({ pseudo: player.user.pseudo, score: player.user.score, owner: player.user.owner });
  }
  return usersInRoom;
}

export function HandleChatMessage(
	players: Player[],
	client: Socket,
	message: string,
	server: Server
): void {
	const user = players.find(p => p.user.client.id === client.id);
	if (user) {
		const chatMessage = {
			pseudo: user.user.pseudo,
			message,
		};
		console.log("chatMessage : ", chatMessage);
		server.to(user.user.room).emit('chatMessage', chatMessage);
	}
}
