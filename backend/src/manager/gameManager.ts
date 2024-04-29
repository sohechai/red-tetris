import sleep from "src/utils/sleep";
import { IBag } from "src/interface/bag";
import { Player } from "src/model/player";
import { Bag } from "./blockBagManager";

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

    bagRefueler() {
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

    async game(): Promise<void> {
        let gamespeed: number = 1000;
        while (1) {
            this.bagRefueler();
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