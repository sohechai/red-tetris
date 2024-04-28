import { User } from "src/interface/user";
import { Socket } from "socket.io"
import { delay } from "rxjs";
import sleep from "src/utils/sleep";

export async function gameManager(users: User[], client: Socket) {
    const owner: User = users[users.findIndex(user => user.client.id === client.id)];
    const players: User[] = users.filter(user => user.room === owner.room);

    owner.client.to(owner.room).emit("gameStart");
    while (1) {
        await sleep(100);
    }
}