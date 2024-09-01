import { Server, Socket } from 'socket.io';
import { jest } from '@jest/globals';
import { Game } from 'src/manager/game.manager';
// Mettez en place la fonction sleep
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


// Tests
describe('GameManager', () => {
  let mockServer: Server;
  let mockSocket: Socket;
  let gameManager: Game;

  beforeEach(() => {
    mockServer = {
      to: jest.fn(() => ({
        emit: jest.fn(),
      })),
    } as unknown as Server;

    mockSocket = {
      id: 'test-client-id',
    } as unknown as Socket;

    gameManager = new Game([], "", mockServer);
  });

  it('should send game over sequence correctly', async () => {
    // Avancer le temps pour éviter les véritables délais dans le test
    jest.useFakeTimers();

    // Appeler la méthode à tester
    const gameOverPromise = gameManager.gameOver(mockSocket);

    // Avancer le temps pour chaque étape de délai
    jest.advanceTimersByTime(500); // 1er délai
    expect(mockServer.to).toHaveBeenCalledWith('test-client-id');
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));
    
    jest.advanceTimersByTime(500); // 2ème délai
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));

    jest.advanceTimersByTime(500); // 3ème délai
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));

    // Avancer le temps pour le dernier emit
    jest.advanceTimersByTime(500); // Dernier délai avant 'gameOver'
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('gameOver');

    // Résoudre la promesse
    await gameOverPromise;

    // Nettoyer les fake timers
    jest.useRealTimers();
  });
});