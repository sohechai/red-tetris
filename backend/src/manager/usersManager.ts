import { Server, Socket } from 'socket.io';
import { User } from 'src/interface/user';
import { generateNewMap } from 'src/model/map';
import { Player } from 'src/model/player';

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

function SendNewUsersInRoom(players: Player[], client: Socket, room: string, server: Server) {
    const usersInRoom: {pseudo: string, score: number, room: string, gameMode: number}[] = [];
    for (let player of players) {
        if(player.user.room === room)
            usersInRoom.push({pseudo: player.user.pseudo, score: player.user.score, room: player.user.room, gameMode: player.user.gameMode});
    }
    console.log(usersInRoom);
    server.to(room).emit("usersInRoom", usersInRoom);
    client.emit("usersInRoom", usersInRoom);
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
    RoomAlreadyExist(players, room) ? 1 : players[players.findIndex(players => players.user.owner === true)].user.gameMode,
    RoomAlreadyExist(players, room) ? false : true,
    generateNewMap(),
    0
  ));
  client.join(room);
  SendNewUsersInRoom(players, client, room, server);
  return players;
}
