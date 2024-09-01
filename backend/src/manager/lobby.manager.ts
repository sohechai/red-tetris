import { Socket } from 'socket.io';
import { Player } from 'src/model/player';

const availableGameMode: number[] = [1, 2];

export function SelectGameMode(players: Player[], gameMode: number, client: Socket): Player[] {
    const owner = players[players.findIndex(players => players.user.client.id === client.id)];
    if (gameMode === 1 || gameMode === 2) {
        owner.user.gameMode = gameMode;
        client.to(owner.user.room).emit("gameModeUpdate", { gameMode });
        for (const player of players) {
            if (player.user.room === owner.user.room) {
                player.user.gameMode = gameMode;
            }
        }
    }
    else {
        client.emit("error", "Error: the selected game mode does not exist.");
    }
    return players;
}