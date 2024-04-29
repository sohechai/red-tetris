import { Map } from "src/interface/map";
import { User, UserInfo } from "src/interface/user";
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
    me(): UserInfo {
        const me: UserInfo = {
            pseudo: this.user.pseudo,
            room: this.user.room,
            gameMode: this.user.gameMode,
            owner: this.user.owner,
            score: this.user.score,
        }
        return me;
    }
}