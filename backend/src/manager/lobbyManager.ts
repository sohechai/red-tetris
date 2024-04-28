import { Socket } from 'socket.io';
import { User } from "src/interface/user";

const availableGameMode: number[] = [1, 2];

export function SelectGameMode(users: User[], gameMode: number, client: Socket) {
    const owner = users[users.findIndex(user => user.client.id === client.id)];
    if (availableGameMode.findIndex(mode => mode === gameMode)) {
        owner.gameMode = gameMode;
        client.to(owner.room).emit("gameModeUpdate", { gameMode });
        for (const user of users) {
            if (user.room === owner.room) {
                user.gameMode = gameMode;
            }
        }
    }
    else {
        client.emit("error", "Error: the selected game mode does not exist.");
    }
}