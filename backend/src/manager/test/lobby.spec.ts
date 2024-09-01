import { Socket } from 'socket.io';
import { SelectGameMode } from 'src/manager/lobby.manager';
import { Player } from 'src/model/player';

// Mocking Socket.io
const mockEmit = jest.fn();
const mockJoin = jest.fn();
const mockTo = jest.fn(() => ({ emit: mockEmit }));
const mockSocket = { id: 'test-client-id', emit: mockEmit, join: mockJoin, to: mockTo } as unknown as Socket;

describe('SelectGameMode', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update the game mode for the owner and all players in the room', () => {
        const players: Player[] = [
            new Player('owner', mockSocket, 'room1', 1, true, null, 0),
            new Player('player1', mockSocket, 'room1', 1, false, null, 0),
            new Player('player2', mockSocket, 'room1', 1, false, null, 0),
        ];

        const newGameMode = 2;
        SelectGameMode(players, newGameMode, mockSocket);

        // Check if the owner’s game mode was updated
        expect(players[0].user.gameMode).toBe(newGameMode);
        // Check if the game mode update was emitted to the room
        expect(mockEmit).toHaveBeenCalledWith('gameModeUpdate', { gameMode: newGameMode });
        // Check if all players in the room have the game mode updated
        for (const player of players) {
            if (player.user.room === 'room1') {
                expect(player.user.gameMode).toBe(newGameMode);
            }
        }
    });

    it('should emit an error if the selected game mode does not exist', () => {
        const players: Player[] = [
            new Player('owner', mockSocket, 'room1', 1, true, null, 0),
        ];

        const invalidGameMode = 99;
        SelectGameMode(players, invalidGameMode, mockSocket);

        // Check if the error was emitted
        expect(mockEmit).toHaveBeenCalledWith('error', 'Error: the selected game mode does not exist.');
    });

    it('should handle cases where the owner is not found', () => {
        const players: Player[] = [
            new Player('player1', mockSocket, 'room1', 1, false, null, 0),
        ];

        const newGameMode = 2;
        SelectGameMode(players, newGameMode, mockSocket);

        // Check that no game mode update or error occurred
        expect(mockEmit).not.toHaveBeenCalledWith('gameModeUpdate');
        expect(mockEmit).not.toHaveBeenCalledWith('error');
    });
});