import sleep from "src/utils/sleep";
import { Player } from "src/model/player";
import { Bag } from "./bagManager";

export class Game {
    players: Player[];
    bag: Bag;

    constructor(players: Player[], room: string) {
        this.bag = new Bag();
        this.players = players.filter(player => player.user.room === room);
        for (let player of this.players) {
            player.bag = this.bag.blocks;
        }
        console.log(this.players);
    }

    bagRefueler(): void {
        for (let player of this.players) {
            console.log(player.bag);
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
        for (let i = 0; i < 20; i ++) {
            for (let j = 0; j < 10; j++) {
                process.stdout.write(this.players[0].map.map[i][j]);
            }
            console.log();
        }
    }

    pieceManager(): void {
        for (let player of this.players) {
            player.map.isBlockFalling() ? player.map.blockFall(player.bag[player.indexOfBag].block) : player.map.addFallingBlock(player.bag[player.indexOfBag].block) ;
        }
    }

    async game(): Promise<void> {
        let gamespeed: number = 200;
        while (1) {
            this.bagRefueler();
            this.pieceManager();
             this.logMap();
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