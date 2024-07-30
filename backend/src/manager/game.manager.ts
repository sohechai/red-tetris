import sleep from "src/utils/sleep";
import { Player } from "src/model/player";
import { Bag } from "./bag.manager";
import { Socket } from "socket.io";

export class Game {
    players: Player[];
    bag: Bag;

    constructor(players: Player[], room: string) {
        this.bag = new Bag();
        this.players = players.filter(player => player.user.room === room);
        for (let player of this.players) {
            player.bag = this.bag.blocks;
        }
    }

    bagRefueler(): void {
        for (let player of this.players) {
            if (player.indexOfBag === player.bag.length - 1) {
                if (this.bag.blocks.length === player.bag.length) {
                    this.bag.AppendBlockToBag();
                }
                player.bag = this.bag.blocks;
            }
        }
    }

    logMap()
    {
        console.log("____________________________");
        for (let y = 0; y < 22; y ++) {
            for (let x = 0; x < 12; x++) {
                if (this.players[0].map.map[y][x] === 10) {
                    process.stdout.write('X');
                }
                else if (this.players[0].map.map[y][x] === 11) {
                    process.stdout.write('I');
                }
                else if (this.players[0].map.map[y][x] === 12) {
                    process.stdout.write('L');
                }
                else if (this.players[0].map.map[y][x] === 13) {
                    process.stdout.write('J');
                }
                else if (this.players[0].map.map[y][x] === 14) {
                    process.stdout.write('O');
                }
                else if (this.players[0].map.map[y][x] === 15) {
                    process.stdout.write('S');
                }
                else if (this.players[0].map.map[y][x] === 16) {
                    process.stdout.write('T');
                }
                else if (this.players[0].map.map[y][x] === 17) {
                    process.stdout.write('Z');
                }
                else if (this.players[0].map.map[y][x] === 0) {
                    process.stdout.write('.');
                }
                else {
                    process.stdout.write(this.players[0].map.map[y][x].toString());
                }
            }
            console.log();
        }
    }

    sendPenality(penality: number, client: Socket): void {
        if (penality) {
            for (let player of this.players) {
                //ADD EMIT GAMEOVER
                if (player.map.addPenality(penality)) {
                    this.players.splice(this.players.findIndex(player => player.user.client.id === client.id), 1);
                }
            }
        }
    }

    pieceManager(): void {
        for (let player of this.players) {
            if (player.map.isBlockFalling()) {
                player.map.blockFall(player.bag[player.indexOfBag]) 
            }
            else {
                // console.log("Index of bag:", player.indexOfBag);
                // console.log(player.bag);
                player.indexOfBag++;
                player.map.addFallingBlock(player.bag[player.indexOfBag]);
            }
            this.sendPenality(player.map.isLineFormed(), player.user.client);
            //ADD EMIT GAMEOVER
            player.user.client.emit("map", player.map.parsed());
            if (player.hasLost())
                this.players.splice(this.players.findIndex(_player => _player.user.client.id === player.user.client.id), 1);
            this.logMap();
            if (player.user.client.disconnected)
                this.players.splice(this.players.findIndex(_player => _player.user.client.id === player.user.client.id), 1);
        }
    }

    async game(): Promise<void> {
        let gamespeed: number = 500;
        while (1) {
            this.bagRefueler();
            this.pieceManager();
            await sleep(gamespeed);
            gamespeed -= 1;
        }
    }
}
// export async function gameManager(users: User[], client: Socket) {
//     const owner: User = users[users.findIndex(user => user.client.id === client.id)];
//     const players: User[] = users.filter(user => user.room === owner.room);

//     owner.client.to(owner.room).emit("gameStart");
//     while (1) {
//         await sleep(100);
//     }
// }