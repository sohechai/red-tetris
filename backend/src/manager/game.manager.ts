import sleep from 'src/utils/sleep';
import { Player } from 'src/model/player';
import { Bag } from './bag.manager';
import { Socket, Server } from 'socket.io';
import { Map } from './map.manager';
import structuredClone from '@ungap/structured-clone';
import { GetUserListFromPlayers } from './users.manager';
import { IMap } from 'src/interface/map';

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

    for (let alert = 0; alert < 3; alert++) {
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
        spectre.push({map: player.map.parsed(player.map.map), pseudo: player.user.pseudo});
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
      if (player.isAlive) count++;
    }
    if (count === 1 && this.players.length !== 1) {
      for (let player of this.players) {
        if (player.isAlive === true) {
          this.srv.to(player.user.client.id).emit("won", true);
          player.user.score += 1000;
          this.srv.to(player.user.room).emit("usersInRoom", GetUserListFromPlayers(this.players));
          console.log("player has won: ", player.user.client.id);
        }
        else {
          this.srv.to(player.user.client.id).emit("won", false);
          console.log("player has lost: ", player.user.client.id);
        }

      }
    }
    console.log("Number of player alive: ", count);
    return count;
  }

  async start(): Promise<void> {
    let gamespeed: number = 1000;
    let playersAlive: number = this.players.length;
    while (1) {
      console.log("yo je suis ici deux fois");
      playersAlive = this.playersAlive()
      if ((this.players.length > 1 && playersAlive === 1) || !playersAlive) break;
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
