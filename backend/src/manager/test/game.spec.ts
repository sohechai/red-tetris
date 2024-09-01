import { Game } from 'src/manager/game.manager';
import { Player } from 'src/model/player';
import { Server, Socket } from 'socket.io';
import { Map } from '../map.manager';

describe('Game', () => {


    let mockServer: Server;
    let mockSocket: Socket;
  let game: Game;
  let players: Player[];
  let server: Server;
  let player: Player;
  let player2: Player;
  let socket: Socket = { id: 'test-id' } as Socket;
  let socket1: Socket = { id: 'test-id' } as Socket;
  player = new Player("joueur1", socket, "room", 1, true, new Map, 0);
  player2 = new Player("joueur2", socket1, "room", 1, true, new Map, 0);
  beforeEach(() => {
    server = new Server();
    players = [player, player2];
    game = new Game(players, 'room', server);
  });

  it('should initialize with players in the correct room', () => {
    expect(game.players.length).toBe(2);
    expect(game.players[0].user.client.id).toBe('test-id');
    expect(game.players[1].user.client.id).toBe('test-id');
  });

  it('should refuel the bag when necessary', () => {
    const initialLength = game.bag.blocks.length;
    players[0].indexOfBag = players[0].bag.length - 2; // Trigger refueling
    game.bagRefueler();
    expect(game.bag.blocks.length).toBeGreaterThan(initialLength);
  });

  it('should send penalty correctly', async () => {
    const client = { id: 'test-id' } as Socket;
    await game.sendPenality(2, client);
    expect(game.players[0].user.client.id).toBe('test-id');
    // Add more assertions as needed
  });

  it('should correctly determine the number of alive players', () => {
    const count = game.playersAlive();
    expect(count).toBe(2);
  });
});