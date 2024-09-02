import { Server, Socket } from 'socket.io';
import { jest } from '@jest/globals';
import { Game } from 'src/manager/game.manager';

const mockEmit = jest.fn();
const mockJoin = jest.fn();
const mockTo = jest.fn(() => ({ emit: mockEmit }));
const mockSocket = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Socket;

const mockServer = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Server;

// Tests
describe('GameManager', () => {
  let gameManager: Game;

  beforeEach(() => {
    gameManager = new Game([], "", mockServer);
  });

  it('should send game over sequence correctly', async () => {
    // Avancer le temps pour éviter les véritables délais dans le test
    jest.useFakeTimers();

    // Appeler la méthode à tester
    const gameOverPromise = gameManager.gameOver(mockSocket);

    // Avancer le temps pour chaque étape de délai
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));
    
    jest.advanceTimersByTime(500); // 2ème délai
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));

    jest.advanceTimersByTime(500); // 3ème délai
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));

    jest.advanceTimersByTime(500); // 3ème délai
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));
    // Avancer le temps pour le dernier emit
    jest.advanceTimersByTime(500); // Dernier délai avant 'gameOver'
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));
    // Avancer le temps pour le dernier emit
    jest.advanceTimersByTime(500); // Dernier
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));
    // Avancer le temps pour le dernier emit
    jest.advanceTimersByTime(500); // Dernier
    expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('map', expect.any(Array));
    // Avancer le temps pour le dernier emit
    // jest.advanceTimersByTime(500); // Dernier
    // expect(mockServer.to('test-client-id').emit).toHaveBeenCalledWith('gameOver');

    // Résoudre la promesse
    jest.useRealTimers();
    await gameOverPromise;
  });
});