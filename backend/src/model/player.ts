import { Map } from "src/manager/map.manager";
import { User, UserInfo } from "src/interface/user";
import { Socket } from "socket.io";
import { IBag } from "src/interface/bag";


export class Player {
    user: User;
    map: Map;
    bag: IBag;
    indexOfBag: number = -1;

    constructor(
        pseudo: string,
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
            score,
        };
        this.map = map;
    }
    me(): UserInfo {
        const me: UserInfo = {
            pseudo: this.user.pseudo,
            room: this.user.room,
            gameMode: this.user.gameMode,
            owner: this.user.owner,
            score: this.user.score,
        };
        return me;
    }

    initBag(bag: IBag) {
        this.bag = bag;
    }

    static getRoomBySocketId(players: Player[], me: Socket): string {
        return players[players.findIndex(player => player.user.client.id === me.id)].user.room;
    }
}