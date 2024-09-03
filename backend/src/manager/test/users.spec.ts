import { CheckIfUserIsUnique, RemoveUser, SendNewUsersInRoom, RoomAlreadyExist, RegisterUser, GetUserListFromPlayers, HandleChatMessage } from 'src/manager/users.manager';
import { createMockSocket, createMockServer } from './__mocks__/socket.mock';
import { createMockPlayer } from './__mocks__/player.mock';
import { Player } from 'src/model/player';
import { Server } from 'socket.io';
import { Socket } from 'dgram';

describe('Player Service Functions', () => {
  let players: Player[];
  let server: Server;

  beforeEach(() => {
    players = [];
    server = createMockServer();
  });

  it('should check if user is unique', () => {
    players.push(createMockPlayer('user1', 'id1', 'room1', false));
    expect(CheckIfUserIsUnique(players, 'user1')).toBe(1);
    expect(CheckIfUserIsUnique(players, 'user2')).toBe(0);
  });

  it('should remove user and handle owner change', () => {
    const socket1 = createMockSocket('id1');
    const socket2 = createMockSocket('id2');
    players.push(createMockPlayer('user1', 'id1', 'room1', false));
    players.push(createMockPlayer('user2', 'id2', 'room1', false));
    players = RemoveUser(players, socket1);
    expect(players.length).toBe(1);
  });

  it('should send new users in room', () => {
    const socket = createMockSocket('id1');
    players.push(createMockPlayer('user1', 'id1', 'room1', true));
    players.push(createMockPlayer('user2', 'id2', 'room1', false));
    SendNewUsersInRoom(players, 'user1', socket, 'room1', server);
    expect(server.emit).toHaveBeenCalledWith('usersInRoom', [
      { pseudo: 'user1', score: 0, owner: true },
      { pseudo: 'user2', score: 0, owner: false }
    ]);
    expect(socket.emit).toHaveBeenCalledWith('me', { pseudo: 'user1', score: 0, owner: true });
  });

  it('should check if room already exists', () => {
    players.push(createMockPlayer('user1', 'id1', 'room1', false));
    expect(RoomAlreadyExist(players, 'room1')).toBe(true);
    expect(RoomAlreadyExist(players, 'room2')).toBe(false);
  });

  it('should register user and join room', () => {
    const socket = createMockSocket('id1');
    const room = 'room1';
    players = RegisterUser(players, 'user1', room, socket, server);
    expect(players.length).toBe(1);
    expect(players[0].user.pseudo).toBe('user1');
    expect(socket.join).toHaveBeenCalledWith(room);
  });

  it('should get user list from players', () => {
    players.push(createMockPlayer('user1', 'id1', 'room1', false));
    players.push(createMockPlayer('user2', 'id2', 'room1', true));
    const users = GetUserListFromPlayers(players);
    expect(users).toEqual([
      { pseudo: 'user1', score: 0, owner: false },
      { pseudo: 'user2', score: 0, owner: true }
    ]);
  });

  it('should handle chat message', () => {
    const socket = createMockSocket('id1');
    players.push(createMockPlayer('user1', 'id1', 'room1', false));
    HandleChatMessage(players, socket, 'Hello world', server);
    expect(server.emit).toHaveBeenCalledWith('chatMessage', { pseudo: 'user1', message: 'Hello world' });
  });
});