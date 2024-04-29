import { Map } from "src/interface/map";
import { User } from "src/interface/user";
import { Socket } from "socket.io";


export class Player {
    user: User = null;
    constructor(pseudo: string,
        client: Socket,
        room: string,
        gameMode: number,
        owner: boolean,
        map: Map,
        score: number) {
            this.user = {
                pseudo,
                client,
                room,
                gameMode,
                owner,
                map,
                score,
            }
    }
}