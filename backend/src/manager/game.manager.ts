import sleep from 'src/utils/sleep';
import { Player } from 'src/model/player';
import { Bag } from './bag.manager';
import { Socket, Server } from 'socket.io';
import { Map } from './map.manager';
import structuredClone from '@ungap/structured-clone';
import { GetUserListFromPlayers } from './users.manager';

export class Game {
  players: Player[];
  bag: Bag;
  srv: Server;

  constructor(players: Player[], room: string, srv: Server) {
    this.bag = new Bag();
    this.players = players.filter((player) => player.user.room === room);
    for (let player of this.players) {
      player.bag = structuredClone(this.bag.blocks);
    }
    this.srv = srv;
  }

  bagRefueler(): void {
    for (let player of this.players) {
      if (player.indexOfBag + 2 === player.bag.length) {
        if (this.bag.blocks.length === player.bag.length) {
          this.bag.AppendBlockToBag();
        }
          player.bag = player.bag.concat(structuredClone(this.bag.blocks));
      }
    }
  }

  logMap() {
    console.log('____________________________');
    for (let y = 0; y < 22; y++) {
      for (let x = 0; x < 12; x++) {
        if (this.players[0].map.map[y][x] === 10) {
          process.stdout.write('X');
        } else if (this.players[0].map.map[y][x] === 11) {
          process.stdout.write('I');
        } else if (this.players[0].map.map[y][x] === 12) {
          process.stdout.write('L');
        } else if (this.players[0].map.map[y][x] === 13) {
          process.stdout.write('J');
        } else if (this.players[0].map.map[y][x] === 14) {
          process.stdout.write('O');
        } else if (this.players[0].map.map[y][x] === 15) {
          process.stdout.write('S');
        } else if (this.players[0].map.map[y][x] === 16) {
          process.stdout.write('T');
        } else if (this.players[0].map.map[y][x] === 17) {
          process.stdout.write('Z');
        } else if (this.players[0].map.map[y][x] === 0) {
          process.stdout.write('.');
        } else {
          process.stdout.write(this.players[0].map.map[y][x].toString());
        }
      }
      console.log();
    }
  }

  async sendPenality(penality: number, client: Socket): Promise<void> {
    if (penality + 1 > 0) {
      for (let player of this.players) {
        //ADD EMIT GAMEOVER
        if (penality < 0) penality = 0;
        if (player.user.client.id !== client.id) {
          player.bag[player.indexOfBag].position[0] -= penality;
          if (player.bag[player.indexOfBag].position[0] < 0)
            player.bag[player.indexOfBag].position[0] = 0;
        }
        if (
          player.user.client.id !== client.id &&
          await player.map.addPenality(penality)
        ) {
          player.isAlive = false;
        } else if (player.user.client.id === client.id) {
          player.user.score += (penality + 1) * (penality + 1) * 50;
          this.srv
            .to(client.id)
            .emit('usersInRoom', GetUserListFromPlayers(this.players));
        }
      }
    }
  }

  async gameOver(client: Socket) {
    let redMap: string[][] = [];
    let emptyMap: string[][] = [];
    for (let y = 0; y < 10; y++) {
      redMap.push([]);
      emptyMap.push([]);
      for (let x = 0; x < 20; x++) {
        emptyMap[y].push('X');
        redMap[y].push('I');
      }
    }

    for (let alert = 0; alert < 10; alert++) {
      this.srv.to(client.id).emit('map', redMap);
      await sleep(500);
      this.srv.to(client.id).emit('map', emptyMap);
      await sleep(500);
    }
    this.srv.to(client.id).emit('gameOver');
  }

  sendSpectre(client: Socket) {
    const spectre = [];
    for (let player of this.players) {
      if (client.id !== player.user.client.id) {
        spectre.push(player.map.parsed(player.map.map));
      }
    }
    for (let player of this.players) {
      if (client.id !== player.user.client.id) {
        this.srv.to(client.id).emit('spectre', spectre);
      }
    }
  }

  async pieceManager() {
    let blockFall: boolean = false;
    for (let player of this.players) {
      if (player.isAlive) {
        if (player.map.isBlockFalling()) {
          player.map.blockFall(player.bag[player.indexOfBag]);
        } else {
          player.indexOfBag++;
          await this.sendPenality(
            await player.map.isLineFormed(player.bag[player.indexOfBag]),
            player.user.client,
          );
          blockFall = await player.map.addFallingBlock(
            player.bag[player.indexOfBag],
          );
          if (blockFall) {
            player.isAlive = false;
            this.gameOver(player.user.client);
            continue;
          }
        }
        //ADD EMIT GAMEOVER
        this.srv
          .to(player.user.client.id)
          .emit('map', player.map.parsed(player.map.map));
        this.srv
          .to(player.user.client.id)
          .emit('nextPiece', player.getNextPiece());
        this.sendSpectre(player.user.client);
        // this.logMap();
        if (player.hasLost()) {
          player.isAlive = false;
          this.gameOver(player.user.client);
        }
        if (player.user.client.disconnected)
          this.players.splice(
            this.players.findIndex(
              (_player) => _player.user.client.id === player.user.client.id,
            ),
            1,
          );
      }
    }
  }

  playersAlive(): number {
    let count: number = 0;
    for (let player of this.players) {
      // console.log(player.isAlive);
      if (player.isAlive) count++;
    }
    if (count === 1)
      this.srv.to(this.players[this.players.findIndex(player => player.isAlive === true)].user.client.id).emit("won");
      this.players[this.players.findIndex(player => player.isAlive === true)].user.score += 1000;
      return count;
  }

  async start(): Promise<void> {
    let gamespeed: number = 1000;
    while (1) {
      if (!this.playersAlive()) break;
      if (this.players.length > 1 && this.playersAlive() === 1) break;
      this.bagRefueler();
      await this.pieceManager();
      await sleep(gamespeed);
      gamespeed -= 1;
    }
    this.bag = new Bag();
    for (let player of this.players) {
      player.indexOfBag = -1;
      player.map = new Map();
      player.isAlive = true;
      player.bag = structuredClone(this.bag.blocks);
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
